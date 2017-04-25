import { Remote } from "./Remote";
import { TypeUtils } from "./utils/TypeUtils";
import { ProxyDef, ProxyDefPair } from "./ProxyDef";

/// Stores the ProxyDefPairs created on the client for sending to the server
export class ProxyDefPairCache {
  private static generated: { [id: string]: ProxyDefPair } = {};

  public static put(obj: Remote, proxy: ProxyDef): void {
    ProxyDefPairCache.generated[proxy.uuid] = { self: obj, proxy: proxy };
  }

  /// Returns null if not found
  public static get(uuid: string): ProxyDefPair {
    var def: ProxyDefPair = ProxyDefPairCache.generated[uuid];
    if (!def) throw "Tried to get ProxyDef before it was loaded!";
    else return def;
  }

  public static has(uuid: string): boolean {
    return ProxyDefPairCache.generated[uuid] != null;
  }

  /// Will create if not found
  public static load(obj: Remote): ProxyDefPair {
    // Check for prexisting
    var has = ProxyDefPairCache.has(obj.__proxy_uuid);
    if (has) return ProxyDefPairCache.get(obj.__proxy_uuid);
    else return ProxyDefPairCache.create(obj);
  }

  /// Given the original object, create an associated proxy
  private static create(obj: Remote): ProxyDefPair {
    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(obj);
    let remote_proto = remote_proto_parent;
    while (remote_proto != Remote.prototype) {
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

    var def: ProxyDef = new ProxyDef(obj.__proxy_uuid, methods);

    // Allow it to be lookuped by uuid
    ProxyDefPairCache.put(obj, def);

    return { self: obj, proxy: def };
  }
}