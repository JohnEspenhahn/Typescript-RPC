import { Remote } from "../../public/rpc/Remote";
import { Marshaller } from "../../public/rpc/Marshaller";
import { RMIRegistry } from "../../public/rpc/RMIRegistry";
import { Demarshaller } from "../../public/rpc/Demarshaller";
import { TypeUtils } from "../../public/rpc/utils/TypeUtils";
import { ResponseCache } from "../../public/rpc/ResponseCache";
import { ProxyDef, ProxyDefPair } from "../../public/rpc/ProxyDef";
import { ProxyDefPairCache } from "../../public/rpc/ProxyDefPairCache";
import { RMILookupRequest, RMIInvokeRequest } from "../../public/rpc/RMIRequest";
import { RMIObject, ProxyObject, RMIResponse } from "../../public/rpc/RMIObject";
import "socket.io";

export class RMIServerRegistry extends RMIRegistry {
  private static registry: RMIServerRegistry = null;

  private serving: { [id: string]: ProxyDefPair } = {};

  private constructor(io: SocketIO.Server) {
    super();

    io.on("connection", (socket: SocketIO.Socket) => {
      socket.on('lookup', (data: RMILookupRequest) => {
        this.remote_lookup(data.path, data.call_uuid, socket);
      });

      socket.on('invoke', (data: RMIInvokeRequest) => {
        this.remote_invoke(data.proxy_uuid, data.call_uuid, data.fn_name, data.args, socket);
      });

      socket.on('response', (data: RMIResponse) => {
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

}