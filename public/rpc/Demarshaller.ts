import { RMIObject } from "./RMIObject";
import { ProxyGenerator } from "./ProxyGenerator";

export namespace Demarshaller {

  export function demarshal(res: RMIObject, source: SocketIO.Socket): any {
    var kind = res.kind;
    switch (kind) {
      case "serializable":
        return res.content;
      case "proxy":
        return ProxyGenerator.load(res.content, source);
      case "promise":
        throw "Promises not yet supported!";
      case "exception":
        throw res.content;
      default:
        throw new Error("Unhandled RMIObject kind " + kind);
    }
  }
  
  export function demarshal_args(res: RMIObject[], source: SocketIO.Socket): any[] {
    var dm = [];
    for (var r of res) dm.push(Demarshaller.demarshal(r, source));
    return dm;
  }
}