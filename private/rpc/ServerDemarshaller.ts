import { RMIResponse } from "../../public/rpc/RMIResponse";
import { ProxyGenerator } from "../../public/rpc/ProxyGenerator";

export namespace ServerDemarshaller {
  export function demarshal(res: RMIResponse): any {
    var kind = res.kind;
    switch (kind) {
      case "serializable":
        return res.content;
      case "proxy":
        return ProxyGenerator.load(res.content);
      case "promise":
        throw "Promises not yet supported!";
      case "exception":
        throw res.content;
      default:
        throw new Error("Unhandled RMIResponse kind " + kind);
    }
  }

  export function demarshal_args(res: RMIResponse[]): any[] {
    var dm = [];
    for (var r of res) dm.push(demarshal(r));
    return dm;
  }
}