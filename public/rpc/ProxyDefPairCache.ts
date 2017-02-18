import { Remote } from "./Remote";
import { TypeUtils } from "./utils/TypeUtils";
import { ProxyDef, ProxyDefPair } from "./ProxyDef";

/// Stores the ProxyDefPairs created on the client for sending to the server
export class ProxyDefPairCache {
  private static generated: { [id: string]: ProxyDefPair } = {};

  public static put(obj: Remote, proxy: ProxyDef) {
    ProxyDefPairCache.generated[proxy.uuid] = { self: obj, proxy: proxy };
  }

  /// Returns null if not found
  public static get(uuid: string) {
    return ProxyDefPairCache.generated[uuid];
  }

  /// Will create if not found
  public static load(obj: Remote): ProxyDefPair {
    // Check for prexisting
    var existing = ProxyDefPairCache.get(obj.proxy_uuid);
    if (existing) return existing;
    else return ProxyDefPairCache.create(obj);
  }

  /// Given the original object, create an associated proxy
  private static create(obj: Remote): ProxyDefPair {
    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(obj);
    let remote_proto = remote_proto_parent;
    while (!remote_proto.hasOwnProperty(Remote.EXPORT)) {
      remote_proto_parent = remote_proto;
      remote_proto = Object.getPrototypeOf(remote_proto);
    }

    // Get all the functions to export
    var methods: string[] = [];
    let keys = Object.getOwnPropertyNames(remote_proto_parent);
    for (let key of keys) {
      if (key === "constructor") continue;
      
      var field = remote_proto_parent[key];
      if (TypeUtils.isFunction(field)) {
        methods.push(key);
      }
    }

    var def: ProxyDef = new ProxyDef(obj.proxy_uuid, methods);

    // Allow it to be lookuped by uuid
    ProxyDefPairCache.put(obj, def);

    return { self: obj, proxy: def };
  }
}