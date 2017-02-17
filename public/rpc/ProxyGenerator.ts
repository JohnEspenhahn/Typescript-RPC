import { ProxyDef } from "./ProxyDef";
import { Marshaller } from "./Marshaller";
import { RMIResponse } from "./RMIResponse";
import { RMIRegistry } from "./RMIRegistry";
import { RemoteInvoker } from "./RemoteInvoker";
import { ClientDemarshaller } from "./ClientDemarshaller";

export class ProxyGenerator {
  private static PROXY_CACHE: { [id: string]: any } = {};

  public static load(def: ProxyDef): any {
    var cached = ProxyGenerator.PROXY_CACHE[def.uuid];
    if (cached) return cached;
    else {
      var proxy = ProxyGenerator.createFromDef(def);
      ProxyGenerator.PROXY_CACHE[def.uuid] = proxy;
      return proxy;
    }
  }

  private static createFromDef(def: ProxyDef): any {
    var proxy: any = {};

    for (let m of def.methods) {
      (function(uuid, fn_name) {
        switch (m.kind) {
          case "sync":
            proxy[fn_name] = function() {
              var cmd_path = `/${RMIRegistry.RMI_BASE}/invoke/${uuid}/${fn_name}`;
              var args = Marshaller.marshal_args(arguments);

              var res: RMIResponse = RemoteInvoker.invoke(cmd_path, args);
              if (res == null)  throw "IOException";
              
              return ClientDemarshaller.demarshal(res);
            };
            break;
          case "async":
            proxy[fn_name] = function() {
              var cmd_path = `/${RMIRegistry.RMI_BASE}/invoke/${uuid}/${fn_name}`;
              var args = Marshaller.marshal_args(arguments);

              return new Promise((resolve, reject) => {
                RemoteInvoker.invoke_async(cmd_path, args, (res: RMIResponse) => {
                  if (res == null) reject();

                  resolve(ClientDemarshaller.demarshal(res));
                });
              });
            };
            break;
        }
      })(def.uuid, m.name);
    }

    return proxy;
  }
}