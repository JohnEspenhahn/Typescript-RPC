import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { RMIInvokeRequest } from "./RMIRequest";
import { SerializableProxy } from "./SerializableProxy";
import { TypeUtils } from "./utils/TypeUtils";

export class ProxyGenerator {
  private static cache: { [id: string]: CachedProxy } = {};

  public static getByUUID(uuid: string): Remote {
    let cp = ProxyGenerator.cache[uuid];
    if (cp == null) return null;
    else return cp.remote;
  }

  public static serialize(remote: Remote): SerializableProxy {
    let uuid: string = remote.__proxy_uuid;
    let cp = ProxyGenerator.cache[uuid];
    if (cp) return cp.serializable_proxy;
    else {
      let serializable_proxy = new SerializableProxy(remote);
      ProxyGenerator.cache[uuid] = new CachedProxy(remote, serializable_proxy);
      return serializable_proxy;
    }
  }

  /// Get a cached Remote implementation of the Proxy or create a new one
  public static deserialize(def: SerializableProxy, source: RMI.Socket): Remote {
    let uuid: string = def.uuid;
    let cp = ProxyGenerator.cache[uuid];
    if (cp) return cp.remote;
    else {
      var remote: Remote = new GeneratedRemoteProxy(def, source);      
      ProxyGenerator.cache[def.uuid] = new CachedProxy(remote, def);
      return remote;
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

  constructor(def: SerializableProxy, source: RMI.Socket) {
    super(def.uuid);

    for (let fn_name of def.methods) {
      (this as any)[fn_name] = genFn(def.uuid, fn_name, source);
    }
  }

}

// Helper class
class CachedProxy {

  constructor(public remote: Remote, public serializable_proxy: SerializableProxy) { }

}
