import { Remote } from "./Remote";
import { UUID } from "./utils/UUID";
import { ProxyDef } from "./ProxyDef";
import { ProxyObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { ResponseCache } from "./ResponseCache";
import { ProxyGenerator } from "./ProxyGenerator";
import { RMIObject, RMIResponse } from "./RMIObject";
import { RMIInvokeRequest, RMILookupRequest } from "./RMIRequest";
import "socket.io";

export class RMIClientRegistry extends RMIRegistry {
  private static registry: RMIClientRegistry = null;

  private constructor(private socket: SocketIO.Socket) {
    super();

    socket.on('invoke', (data: RMIInvokeRequest) => {
      this.remote_invoke(data.proxy_uuid, data.call_uuid, data.fn_name, data.args, socket);
    });

    socket.on('response', (data: RMIResponse) => {
      ResponseCache.handle(data, socket);
    });
  }

  public static get(socket: SocketIO.Socket): RMIClientRegistry {
    if (RMIClientRegistry.registry == null)
      RMIClientRegistry.registry = new RMIClientRegistry(socket);

    return RMIClientRegistry.registry;
  }

  public lookup<T extends Remote>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      var req: RMILookupRequest = { 
        path: path,
        call_uuid: UUID.generate()
      };

      ResponseCache.on(req.call_uuid, resolve);
      this.socket.emit('lookup', req);
    });
  }

  public serve(path: string, obj: Remote): boolean {
    throw "Client cannot serve";
  }

}