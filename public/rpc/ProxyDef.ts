import { UUID } from "UUID";
import { Remote } from "Remote";

export interface ProxyDef {
  uuid: string;
  methods: MethodDef[];
}

export interface MethodDef {
  name: string;
  kind: "sync" | "async";
}

export namespace ProxyDefGenerator {
  export function generate(obj: Remote): ProxyDef {
    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(this);
    let remote_proto = remote_proto_parent;
    while (!remote_proto.hasOwnProperty(Remote.EXPORT)) {
      remote_proto_parent = remote_proto;
      remote_proto = Object.getPrototypeOf(remote_proto);
    }

    // Get all the functions to export
    let keys = Object.getOwnPropertyNames(remote_proto_parent);
      for (let key of keys) {
        if (key === "constructor") continue;
        
        if (typeof remote_proto_parent[key] !== "function") {

        }

        
      }

    var methods: MethodDef[] = [];

    return {
      uuid: UUID.generate(),
      methods: methods
    };
  }

  function isFunction(a: any): boolean {
    return typeof a === "function";
  }
}