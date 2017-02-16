import { ProxyDef } from "./ProxyDef";
import { Marshaller } from "./Marshaller";
import { RMIResponse } from "./RMIResponse";
import { RMIRegistry } from "./RMIRegistry";
import { HttpClient } from "./utils/HttpClient";
import { ClientDemarshaller } from "./ClientDemarshaller";

export class ProxyCache {
  private static PROXY_CACHE: { [id: string]: any } = {};

  public static loadProxy(def: ProxyDef): any {
    var cached = ProxyCache.PROXY_CACHE[def.uuid];
    if (cached) return cached;
    else {
      var proxy = ProxyCache.createProxy(def);
      ProxyCache.PROXY_CACHE[def.uuid] = proxy;
      return proxy;
    }
  }

  private static createProxy(def: ProxyDef): any {
    var proxy: any = {};

    for (let m of def.methods) {
      (function(uuid, fn_name) {
        switch (m.kind) {
          case "sync":
            proxy[fn_name] = function() {
              var path = `/${RMIRegistry.RMI_BASE}/invoke/${uuid}/${fn_name}`;
              var args = JSON.stringify(Marshaller.marshal_args(arguments));

              var res: RMIResponse = HttpClient.get(`${path}?q=${encodeURIComponent(args)}`);
              if (res == null) 
                throw "IOException";
              else 
                return ClientDemarshaller.demarshal(res);
            };
            break;
          case "async":
            throw "Async remote invokations not supported yet!";
        }
      })(def.uuid, m.name);
    }

    return proxy;
  }
}