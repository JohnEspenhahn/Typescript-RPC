import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { TypeUtils } from "./utils/TypeUtils";
import { Demarshaller } from "./Demarshaller";
import { RMIObject, RMIResponse } from "./RMIObject";
import { ProxyDefPairCache } from "./ProxyDefPairCache";

export abstract class RMIRegistry {
  public static readonly RMI_BASE = "rmi";

  abstract lookup<T>(path: string): Promise<T>;
  abstract serve(path: string, obj: Remote): boolean;

  protected respond(call_uuid: string, obj: any, source: SocketIO.Socket): void {
    console.log("responding " + obj);
    source.emit('response', new RMIResponse(call_uuid, Marshaller.marshal(obj)));
  }

  // Other proxies might have been passed to client, so look up in entire cache for def
  protected remote_invoke(proxy_uuid: string, call_uuid: string, fn_name: string, args: RMIObject[], source: SocketIO.Socket) {
    console.log("Invoking " + fn_name);
    var pair = ProxyDefPairCache.get(proxy_uuid);
    if (pair) {
      var self = pair.self;
      var fn = (self as any)[fn_name] as Function;
      if (fn) {
        var promise_resp = fn.apply(self, Demarshaller.demarshal_args(args, source));
        if (promise_resp == null) {
          this.respond(call_uuid, null, source);
        } else if (TypeUtils.isPromise(promise_resp)) {
          promise_resp.then(
            (fn_res: any) => this.respond(call_uuid, fn_res, source),
            (err: any) => this.respond(call_uuid, new Error(err), source)
          );
        }
      } else this.respond(call_uuid, new Error("No such function " + fn_name), source);
    } else this.respond(call_uuid, new Error("No such proxy with uuid " + proxy_uuid), source);
  }
}