import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { TypeUtils } from "./utils/TypeUtils";
import { RMIInvokeRequest } from "./RMIRequest";
import { RMIObject } from "./RMIObject";
import { ProxyGenerator } from "./ProxyGenerator"

export abstract class RMIRegistry {
  public static DEBUG: boolean = true;
  public static readonly RMI_BASE = "rmi";

  abstract lookup<T extends Remote>(path: string): Promise<T>;
  abstract serve(path: string, obj: Remote): boolean;

  /// Utility function to emit a response event to the given source socket
  protected respond(obj: any, callback: ResolveFunction): void {
    var marshalled_obj = Marshaller.marshal(obj);
    if (RMIRegistry.DEBUG) console.log("Responding " + JSON.stringify(marshalled_obj));
    callback(marshalled_obj);
  }

  protected remote_invoke(data: RMIInvokeRequest, source: RMI.Socket, callback: ResolveFunction) {
    if (RMIRegistry.DEBUG) console.log("Invoking " + data.fn_name);

    var remote = ProxyGenerator.getByUUID(data.ProxyUUIDSymbol);
    if (remote) {
      var fn = (remote as any)[data.fn_name];
      if (fn && fn.apply) {
        try {
          var promise_resp = fn.apply(remote, Marshaller.demarshal_args(data.args, source));
          if (promise_resp == null) {
            this.respond(null, callback);
          } else if (TypeUtils.isThenable(promise_resp)) {
            promise_resp.then(
              (fn_res: any) => this.respond(fn_res, callback),
              (err: any) => {
                if (RMIRegistry.DEBUG) console.log(err);

                if (err instanceof Error) this.respond(err, callback)
                else this.respond("" + err, callback)
              }
            );
          } else {
            this.respond(promise_resp, callback);
          }
        } catch (e) {
          console.log(e);
          this.respond(new Error("UncaughtException: " + e), callback);
        }
      } else this.respond(new Error("No such function " + data.fn_name), callback);
    } else this.respond(new Error("No such proxy with uuid " + data.ProxyUUIDSymbol), callback);
  }
}