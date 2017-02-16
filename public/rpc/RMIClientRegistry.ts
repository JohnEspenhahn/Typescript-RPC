import { Remote } from "./Remote";
import { ProxyDef } from "./ProxyDef";
import { HttpClient } from "./HttpClient";
import { RMIRegistry } from "./RMIRegistry";
import { InvokeReponse } from "./ResponseInvoke";
var Cache = require("memory-cache");

export class RMIClientRegistry implements RMIRegistry {
  static RMI_BASE = "/rmi"; // also in RMIServerRegistry
  static PROXY_CACHE = new Cache();

  public lookup<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      HttpClient.get(`${RMIClientRegistry.RMI_BASE}/lookup/${path}`, (def: ProxyDef) => {
        if (def == null) return reject();
        else resolve(loadProxy(def));
      });
    });
  }

  public serve(path: string, obj: Remote): boolean {
    throw "Client doees not support serve yet";
  }
}

function loadProxy(def: ProxyDef): any {
  var cached = RMIClientRegistry.PROXY_CACHE.get(def.uuid);
  if (cached) return cached;
  else {
    var proxy = createProxy(def);
    RMIClientRegistry.PROXY_CACHE.put(def.uuid, proxy, 60000);
    return proxy;
  }
}

function createProxy(def: ProxyDef): any {
  var proxy: any = {};

  for (let m of def.methods) {
    (function(uuid, m) {
      switch (m.kind) {
        case "sync":
          proxy[m.name] = function() {
            return remoteInvoke.apply(this, [ `${RMIClientRegistry.RMI_BASE}/invoke/${uuid}/${m.name}`, arguments ]);
          };
          break;
        case "async":
          throw "Async remote invokations not supported yet!";
      }
    })(def.uuid, m);
  }

  return proxy;
}

function remoteInvoke(path: string, args: any[]) {
  var res: InvokeReponse = HttpClient.get(`${path}?q=${encodeURIComponent(JSON.stringify(args))}`);
  if (res == null) throw "IOException";

  switch (res.kind) {
    case "serializable":
      return res.content;
    case "proxy":
      return loadProxy(res.content);
    case "promise":
      throw "Promises not yet supported!";
  }
}