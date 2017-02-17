import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { Demarshaller } from "./Demarshaller";
import { RMIInvokeRequest } from "./RMIRequest";
import { ResponseCache } from "./ResponseCache";
import { ProxyDef } from "./ProxyDef";
import { UUID } from "./utils/UUID";
import { ProxyDefPairCache } from "./ProxyDefPairCache";

export namespace ProxyGenerator {

  export function load(def: ProxyDef, source: SocketIO.Socket): Remote {
    var cached = ProxyDefPairCache.get(def.uuid);
    if (cached) {
      return cached.self;
    } else {
      var proxy = new GeneratedRemoteProxy(def, source);
      ProxyDefPairCache.put(proxy, def);
      return proxy;
    }
  }
  
}

class GeneratedRemoteProxy extends Remote {
  private __source: SocketIO.Socket;

  constructor(def: ProxyDef, source: SocketIO.Socket) {
    super(def.uuid);

    this.__source = source;

    for (let fn_name of def.methods) {
      this.__make_proxy_fn(fn_name);
    }
  }

  private __make_proxy_fn(fn_name: string) {
    var proxy_uuid = this.proxy_uuid;
    var source = this.__source;
    (this as any)[fn_name] = function() {
      var args = Marshaller.marshal_args(arguments);

      return new Promise((resolve, reject) => {
        var req: RMIInvokeRequest = {
          proxy_uuid: proxy_uuid,
          call_uuid: UUID.generate(),
          fn_name: fn_name,
          args: args
        };

        ResponseCache.on(req.call_uuid, resolve);
        source.emit('invoke', req);        
      });
    };
  }

}