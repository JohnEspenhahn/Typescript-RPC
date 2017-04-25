import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIRegistry } from "./RMIRegistry";
import { Demarshaller } from "./Demarshaller";
import { TypeUtils } from "./utils/TypeUtils";
import { ProxyDef, ProxyDefPair } from "./ProxyDef";
import { ProxyDefPairCache } from "./ProxyDefPairCache";
import { RMILookupRequest, RMIInvokeRequest } from "./RMIRequest";
import { RMIObject, ProxyObject } from "./RMIObject";

export class RMIServerRegistry extends RMIRegistry {
  private static registry: RMIServerRegistry = null;

  private serving: { [id: string]: ProxyDefPair } = {};

  private constructor(io: SocketIO.Server) {
    super();

    this.setupMiddleware();

    io.on("connection", (socket: RMI.Socket) => {
      console.log("Connection!");

      socket.on('lookup', (data: RMILookupRequest, callback: ResolveFunction) => {
        console.log("Lookup");
        var s = this.serving[data.path];
        if (s) this.respond(s, callback);
        else this.respond(new Error("Not serving " + data.path), callback);
      });

      socket.on('invoke', (data: RMIInvokeRequest, callback: ResolveFunction) => {
        console.log("invoke");
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
    if (this.serving[path]) return false;
    else this.serving[path] = ProxyDefPairCache.load(obj);
  }

  public readonly express = { middleware: (req: any, res: any, next: Function) => {} };
  private setupMiddleware() {
    var _self: RMIServerRegistry = this;
    this.express.middleware = function (req: any, res: any, next: Function) {
      if (req.originalUrl.startsWith(`/${RMIRegistry.RMI_BASE}/lookup?`)) {
        var path = req.query.path;
        if (_self.serving[path])
          res.json(<RMIObject> Marshaller.marshal(_self.serving[path].proxy));
        else
          res.status(404).end();
      }
      next();
    };
  }

}