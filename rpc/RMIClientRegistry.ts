import { Remote } from "./Remote";
import { UUID } from "./utils/UUID";
import { ProxyDef } from "./ProxyDef";
import { ProxyObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { Demarshaller } from "./Demarshaller";
import { ResponseCache } from "./ResponseCache";
import { ProxyGenerator } from "./ProxyGenerator";
import { RMIObject, RMIResponse } from "./RMIObject";
import { RMIInvokeRequest, RMILookupRequest } from "./RMIRequest";

export class RMIClientRegistry extends RMIRegistry {
  private static registry: RMIClientRegistry = null;

  private constructor(private socket: SocketIO.Socket) {
    super();

    socket.on('invoke', (data: RMIInvokeRequest) => {
      this.remote_invoke(data, socket);
    });

    socket.on('response', (data: RMIResponse) => {
      ResponseCache.handle(data, socket);
    });
  }

  /// Get the singleton instance
  public static get(socket: SocketIO.Socket): RMIClientRegistry {
    if (RMIClientRegistry.registry == null)
      RMIClientRegistry.registry = new RMIClientRegistry(socket);

    return RMIClientRegistry.registry;
  }

  /// Lookup the Remote served at the given path on the server
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

  public lookup_sync<T>(path: string): T {
    var req: RMILookupRequest = { 
      path: path,
      call_uuid: UUID.generate()
    };

    var request = new XMLHttpRequest();
    request.open('GET', `${RMIRegistry.RMI_BASE}/lookup?path=${path}`, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200)
      return Demarshaller.demarshal(<RMIObject> JSON.parse(request.responseText), this.socket);
    else 
      throw "Failed to lookup " + path;
  }

  public serve(path: string, obj: Remote): boolean {
    throw "Client cannot serve";
  }

}