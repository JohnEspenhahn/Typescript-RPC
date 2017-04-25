import { RMIObject } from "./RMIObject";
import { ProxyGenerator } from "./ProxyGenerator";

export namespace Demarshaller {

  /// Given an RMIObject loaded from the socket and turn it back into a normal javascript object
  export function demarshal(res: RMIObject, source: RMI.Socket): any {
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
  
  /// Given a list of RMIObjects apply demarshal to them and return as an array
  export function demarshal_args(res: RMIObject[], source: RMI.Socket): any[] {
    var dm: any[] = [];
    for (var r of res) dm.push(Demarshaller.demarshal(r, source));
    return dm;
  }
}