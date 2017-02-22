import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { TypeUtils } from "./utils/TypeUtils";
import { Demarshaller } from "./Demarshaller";
import { RMIInvokeRequest } from "./RMIRequest";
import { RMIObject, RMIResponse } from "./RMIObject";
import { ProxyDefPairCache } from "./ProxyDefPairCache";

export abstract class RMIRegistry {
  public static DEBUG: boolean = false;
  public static readonly RMI_BASE = "rmi";

  abstract lookup<T>(path: string): Promise<T>;
  abstract serve(path: string, obj: Remote): boolean;

  /// Utility function to emit a response event to the given source socket
  protected respond(call_uuid: string, obj: any, source: RMI.Socket): void {
    var marshalled_obj = Marshaller.marshal(obj);
    if (RMIRegistry.DEBUG) console.log("responding " + JSON.stringify(marshalled_obj));

    var rmi_resp: RMIResponse = { call_uuid: call_uuid, response: marshalled_obj };
    source.emit('response', rmi_resp);
  }

  protected remote_invoke(data: RMIInvokeRequest, source: RMI.Socket) {
    if (RMIRegistry.DEBUG) console.log("Invoking " + data.fn_name);

    var pair = ProxyDefPairCache.get(data.proxy_uuid);
    if (pair) {
      var self = pair.self;
      var fn = (self as any)[data.fn_name] as Function;
      if (fn) {
        var promise_resp = fn.apply(self, Demarshaller.demarshal_args(data.args, source));
        if (promise_resp == null) {
          this.respond(data.call_uuid, null, source);
        } else if (TypeUtils.isThenable(promise_resp)) {
          Promise.resolve(promise_resp).then(
            (fn_res: any) => this.respond(data.call_uuid, fn_res, source),
            (err: any) => this.respond(data.call_uuid, new Error(err), source)
          );
        }
      } else this.respond(data.call_uuid, new Error("No such function " + data.fn_name), source);
    } else this.respond(data.call_uuid, new Error("No such proxy with uuid " + data.proxy_uuid), source);
  }
}