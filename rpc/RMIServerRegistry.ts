import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIRegistry } from "./RMIRegistry";
import { TypeUtils } from "./utils/TypeUtils";
import { SerializableProxy } from "./SerializableProxy";
import { ProxyGenerator } from "./ProxyGenerator";
import { RMILookupRequest, RMIInvokeRequest } from "./RMIRequest";
import { RMIObject, ProxyObject } from "./RMIObject";

Remote.prototype.__broadcast_attribute = function() {
  console.log("__broadcast_attribute from server");
};

export class RMIServerRegistry extends RMIRegistry {
  private static registry: RMIServerRegistry = null;
  private serving: Map<string,SerializableProxy> = new Map();

  private constructor(io: SocketIO.Server) {
    super();

    this.setupMiddleware();

    io.on("connection", (socket: RMI.Socket) => {
      console.log("Connection!");

      socket.on('lookup', (data: RMILookupRequest, callback: ResolveFunction) => {
        if (RMIRegistry.DEBUG) 
          console.log("Lookup " + data.path);
        
        if (this.serving.has(data.path))
          this.respond(this.serving.get(data.path), callback);
        else 
          this.respond(new Error("Not serving " + data.path), callback);
      });

      socket.on('invoke', (data: RMIInvokeRequest, callback: ResolveFunction) => {
        this.remote_invoke(data, socket, callback);
      });
    });
  }

  public static get(io: SocketIO.Server): RMIServerRegistry {
    if (RMIServerRegistry.registry == null)
      RMIServerRegistry.registry = new RMIServerRegistry(io);

    return RMIServerRegistry.registry;
  }
  
  public lookup<T>(path: string): Promise<T> {
    throw "Server does not support lookup yet";
  }

  public serve(path: string, obj: Remote): boolean {
    if (this.serving.has(path)) return false;
    else this.serving.set(path, ProxyGenerator.serialize(obj));
  }

  public readonly express = { middleware: (req: any, res: any, next: Function) => {} };
  private setupMiddleware() {
    this.express.middleware = (req: any, res: any, next: Function) => {
      if (req.originalUrl.startsWith(`/${RMIRegistry.RMI_BASE}/lookup?`)) {
        var path = req.query.path;
        if (this.serving.has(path))
          res.json(Marshaller.marshal(this.serving.get(path)));
        else
          res.status(404).end();
      }
      next();
    };
  }

}