import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { RMIInvokeRequest } from "./RMIRequest";
import { SerializableProxy } from "./SerializableProxy";
import { TypeUtils } from "./utils/TypeUtils";
import { RPCError } from "./RPCError";

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
      var remote: Remote = generateRemoteProxy(def, source);      
      ProxyGenerator.cache[def.uuid] = new CachedProxy(remote, def);
      return remote;
    }
  }

  public static setAttribute(uuid: string, attribute_name: string, value: any) {
    let cp = ProxyGenerator.cache[uuid];
    if (cp) {
      let remote = cp.remote;
      if ((remote instanceof GeneratedRemoteProxy) && remote["__" + attribute_name]) {
        // Should only do this on generated remote proxies with the given attribute
        remote["__" + attribute_name] = value;
      }
    }
  }
  
}

function genFn(proxy_uuid: string, fn_name: string): Function {
  return function() {
    if (!this.__connected)
      throw new RPCError("Client disconnected");

    var args = Marshaller.marshal_args(arguments);
    return new Promise((resolve, reject) => {
      var req: RMIInvokeRequest = {
        proxy_uuid: proxy_uuid,
        fn_name: fn_name,
        args: args
      };

      this.__source.emit('invoke', req, (res: RMIObject) => {
        try {
          resolve(Marshaller.demarshal(res, this.__source));
        } catch (e) {
          reject(e);
        }
      });
    });
  };
}

class GeneratedRemoteProxy extends Remote { }

/// A proxy is converted into a Remote so it can be exported to another client if need be
function generateRemoteProxy(def: SerializableProxy, source: RMI.Socket): Remote {
  let gen_class = class extends GeneratedRemoteProxy {
    private __connected: boolean;

    constructor(def: SerializableProxy, private __source: RMI.Socket) {
      super(def.uuid);

      // Watch for lost connection
      this.__connected = true;
      this.__source.on('disconnect', () => {
        this.__connected = false;
        console.log(def.uuid + " disconnected");
      });
    }
  };
  
  let prototype = gen_class.prototype;

  // Define stub functions
  for (let fn_name of def.methods) {
    prototype[fn_name] = genFn(def.uuid, fn_name);
  }

  // Add readonly values, if given
  if (def.readonlyValues) {
    for (let name in def.readonlyValues) {
      // When need to modify, set __XXX
      let hidden_name = "__" + name;
      prototype[hidden_name] = def.readonlyValues[name];

      Object.defineProperty(prototype, name, {
        configurable: false,
        enumerable: false,
        get: function() {
          return this[hidden_name];
        }
      });
    }
  }

  return new gen_class(def, source);
}

// Helper class
class CachedProxy {

  constructor(public remote: Remote, public serializable_proxy: SerializableProxy) { }

}
