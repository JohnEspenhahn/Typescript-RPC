import { RMIResponse } from "./RMIResponse";
import { ProxyGenerator } from "./ProxyGenerator";

export namespace ClientDemarshaller {
  export function demarshal(res: RMIResponse) {
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
}