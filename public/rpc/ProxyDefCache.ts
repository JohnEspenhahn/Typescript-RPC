import { Remote } from "./Remote";
import { TypeUtils } from "./utils/TypeUtils";
import { ProxyDef, ProxyDefPair, MethodDef } from "./ProxyDef";

export class ProxyDefCache {
  private static generated: { [id: string]: ProxyDefPair } = {};

  private static put(obj: Remote, proxy: ProxyDef) {
    ProxyDefCache.generated[proxy.uuid] = { self: obj, proxy: proxy };
  }

  /// Returns null if not found
  public static get(uuid: string) {
    return ProxyDefCache.generated[uuid];
  }

  /// Will create if not found
  public static load(obj: Remote): ProxyDefPair {
    // Check for prexisting
    var existing = ProxyDefCache.get(obj.proxy_uuid);
    if (existing) return existing;

    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(obj);
    let remote_proto = remote_proto_parent;
    while (!remote_proto.hasOwnProperty(Remote.EXPORT)) {
      remote_proto_parent = remote_proto;
      remote_proto = Object.getPrototypeOf(remote_proto);
    }

    // Get all the functions to export
    var methods: MethodDef[] = [];
    let keys = Object.getOwnPropertyNames(remote_proto_parent);
    for (let key of keys) {
      if (key === "constructor") continue;
      
      var field = remote_proto_parent[key];
      if (TypeUtils.isFunction(field)) {
        methods.push({
          name: key,
          kind: "sync"
        });
      } else if (TypeUtils.isGenerator(field)) {
        methods.push({
          name: key,
          kind: "async"
        });
      }
    }

    var def: ProxyDef = {
      uuid: obj.proxy_uuid,
      methods: methods
    };

    // Allow it to be lookuped by uuid
    ProxyDefCache.put(obj, def);

    return { self: obj, proxy: def };
  }
}