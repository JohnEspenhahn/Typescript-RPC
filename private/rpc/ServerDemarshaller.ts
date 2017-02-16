import { RMIResponse } from "../../public/rpc/RMIResponse";

export namespace ServerDemarshaller {
  export function demarshal(res: RMIResponse): any {
    var kind = res.kind;
    switch (kind) {
      case "serializable":
        return res.content;
      case "proxy":
        // return this.loadProxy(res.content);
        throw "Proxies not yet supported!";
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