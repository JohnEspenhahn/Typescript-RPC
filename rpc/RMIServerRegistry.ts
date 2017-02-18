import { Remote } from "./Remote";
import { Marshaller } from "./Marshaller";
import { RMIRegistry } from "./RMIRegistry";
import { Demarshaller } from "./Demarshaller";
import { TypeUtils } from "./utils/TypeUtils";
import { ResponseCache } from "./ResponseCache";
import { ProxyDef, ProxyDefPair } from "./ProxyDef";
import { ProxyDefPairCache } from "./ProxyDefPairCache";
import { RMILookupRequest, RMIInvokeRequest } from "./RMIRequest";
import { RMIObject, ProxyObject, RMIResponse } from "./RMIObject";

export class RMIServerRegistry extends RMIRegistry {
  private static registry: RMIServerRegistry = null;

  private serving: { [id: string]: ProxyDefPair } = {};

  private constructor(io: SocketIO.Server) {
    super();

    this.setupMiddleware();

    io.on("connection", (socket: SocketIO.Socket) => {
      console.log("Connection!");

      socket.on('lookup', (data: RMILookupRequest) => {
        console.log("Lookup");
        this.remote_lookup(data.path, data.call_uuid, socket);
      });

      socket.on('invoke', (data: RMIInvokeRequest) => {
        console.log("invoke");
        this.remote_invoke(data, socket);
      });

      socket.on('response', (data: RMIResponse) => {
        console.log("response");
        ResponseCache.handle(data, socket);
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

  /// Uses this.serving because can only lookup things that have been explicity served
  private remote_lookup(path: string, call_uuid: string, source: SocketIO.Socket): any {
    console.log("Looking up " + path);
    if (this.serving[path]) 
      return this.respond(call_uuid, this.serving[path].proxy, source);
    else 
      return this.respond(call_uuid, new Error("Not serving " + path), source);
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