import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { TypeUtils } from "./utils/TypeUtils";
import { Demarshaller } from "./Demarshaller";
import { RMIInvokeRequest } from "./RMIRequest";
import { RMIObject } from "./RMIObject";
import { ProxyDefPairCache } from "./ProxyDefPairCache";

export abstract class RMIRegistry {
  public static DEBUG: boolean = false;
  public static readonly RMI_BASE = "rmi";

  abstract lookup<T>(path: string): Promise<T>;
  abstract serve(path: string, obj: Remote): boolean;

  /// Utility function to emit a response event to the given source socket
  protected respond(obj: any, callback: ResolveFunction): void {
    var marshalled_obj = Marshaller.marshal(obj);
    if (RMIRegistry.DEBUG) console.log("responding " + JSON.stringify(marshalled_obj));
    callback(marshalled_obj);
  }

  protected remote_invoke(data: RMIInvokeRequest, source: RMI.Socket, callback: ResolveFunction) {
    if (RMIRegistry.DEBUG) console.log("Invoking " + data.fn_name);

    var pair = ProxyDefPairCache.get(data.proxy_uuid);
    if (pair) {
      var self = pair.self;
      var fn = (self as any)[data.fn_name] as Function;
      if (fn) {
        try {
          var promise_resp = fn.apply(self, Demarshaller.demarshal_args(data.args, source));
          if (promise_resp == null) {
            this.respond(null, callback);
          } else if (TypeUtils.isThenable(promise_resp)) {
            Promise.resolve(promise_resp).then(
              (fn_res: any) => this.respond(fn_res, callback),
              (err: any) => {
                if (err instanceof Error)
                  this.respond(err, callback)
                else 
                  this.respond("" + err, callback)
              }
            );
          }
        } catch (e) {
          this.respond(new Error("UncaughtException: " + e), callback);
        }
      } else this.respond(new Error("No such function " + data.fn_name), callback);
    } else this.respond(new Error("No such proxy with uuid " + data.proxy_uuid), callback);
  }
}