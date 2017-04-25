import { Remote } from "./Remote";
import { UUID } from "./utils/UUID";
import { SerializableProxy } from "./SerializableProxy";
import { ProxyObject } from "./RMIObject";
import { RMIRegistry } from "./RMIRegistry";
import { Marshaller } from "./Marshaller";
import { ProxyGenerator } from "./ProxyGenerator";
import { RMIObject } from "./RMIObject";
import { RMIInvokeRequest, RMILookupRequest } from "./RMIRequest";

export class RMIClientRegistry extends RMIRegistry {
  private static registry: RMIClientRegistry = null;
  private static socket: RMI.Socket = null;

  private constructor(private socket: RMI.Socket) {
    super();

    socket.on('invoke', (data: RMIInvokeRequest, callback: ResolveFunction) => {
      this.remote_invoke(data, socket, callback);
    });

  }

  public static getIO(): RMI.Socket {
    if (RMIClientRegistry.socket) return RMIClientRegistry.socket;
    else if (!io || typeof io.connect !== "function") throw "Socket.io not imported!";

    var sock = io.connect();
    RMIClientRegistry.socket = sock;
    return sock;
  }

  /// Get the singleton instance
  public static get(socket: RMI.Socket = null): RMIClientRegistry {
    if (RMIClientRegistry.registry == null) {
      if (socket == null) socket = RMIClientRegistry.getIO();
      RMIClientRegistry.registry = new RMIClientRegistry(socket);
    }

    return RMIClientRegistry.registry;
  }

  /// Lookup the Remote served at the given path on the server
  public lookup<T extends Remote>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      var req: RMILookupRequest = { 
        path: path
      };

      this.socket.emit('lookup', req, (res: RMIObject) => {
        try {
          resolve(Marshaller.demarshal(res, this.socket));
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  public lookup_sync<T>(path: string): T {
    var request = new XMLHttpRequest();
    request.open('GET', `${RMIRegistry.RMI_BASE}/lookup?path=${path}`, false);  // `false` makes the request synchronous
    request.send(null);

    if (request.status === 200)
      return Marshaller.demarshal(<RMIObject> JSON.parse(request.responseText), this.socket);
    else 
      throw new Error("Failed to lookup " + path);
  }

  public serve(path: string, obj: Remote): boolean {
    throw "Client cannot serve";
  }

}