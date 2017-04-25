import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { RMIInvokeRequest } from "./RMIRequest";
import { ProxyDef } from "./ProxyDef";
import { ProxyDefPairCache } from "./ProxyDefPairCache";

export namespace ProxyGenerator {

  /// Get a cached Remote implementation of the Proxy or create a new one
  export function load(def: ProxyDef, source: RMI.Socket): Remote {
    var has_cached = ProxyDefPairCache.has(def.uuid);
    if (has_cached) {
      return ProxyDefPairCache.get(def.uuid).self;
    } else {
      var proxy: Remote = new GeneratedRemoteProxy(def, source);      
      ProxyDefPairCache.put(proxy, def);
      return proxy;
    }
  }
  
}

function genFn(proxy_uuid: string, fn_name: string, source: RMI.Socket): Function {
  return function() {
    var args = Marshaller.marshal_args(arguments);

    return new Promise((resolve, reject) => {
      var req: RMIInvokeRequest = {
        proxy_uuid: proxy_uuid,
        fn_name: fn_name,
        args: args
      };

      source.emit('invoke', req, (res: RMIObject) => {
        try {
          resolve(Marshaller.demarshal(res, source));
        } catch (e) {
          reject(e);
        }
      });
    });
  };
}

/// A proxy is converted into a Remote so it can be exported to another client if need be
class GeneratedRemoteProxy extends Remote {

  constructor(def: ProxyDef, source: RMI.Socket) {
    super(def.uuid);

    for (let fn_name of def.methods) {
      (this as any)[fn_name] = genFn(def.uuid, fn_name, source);
    }
  }

}