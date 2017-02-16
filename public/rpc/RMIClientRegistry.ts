import { Remote } from "./Remote";
import { ProxyDef } from "./ProxyDef";
import { Marshaller } from "./Marshaller";
import { RMIRegistry } from "./RMIRegistry";
import { HttpClient } from "./utils/HttpClient";
import { InvokeReponse } from "./ResponseInvoke";

export class RMIClientRegistry implements RMIRegistry {
  static RMI_BASE = "rmi"; // also in RMIServerRegistry
  static PROXY_CACHE: { [id: string]: any } = {};

  public lookup<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      HttpClient.get(`/${RMIClientRegistry.RMI_BASE}/lookup/${path}`, (def: ProxyDef) => {
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
  var cached = RMIClientRegistry.PROXY_CACHE[def.uuid];
  if (cached) return cached;
  else {
    var proxy = createProxy(def);
    RMIClientRegistry.PROXY_CACHE[def.uuid] = proxy;
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
            return remoteInvoke.apply(this, [ 
              `/${RMIClientRegistry.RMI_BASE}/invoke/${uuid}/${m.name}`, 
              Marshaller.args(arguments)
            ]);
          };
          break;
        case "async":
          throw "Async remote invokations not supported yet!";
      }
    })(def.uuid, m);
  }

  return proxy;
}

function remoteInvoke(path: string, args: string) {
  var res: InvokeReponse = HttpClient.get(`${path}?q=${encodeURIComponent(args)}`);
  if (res == null) throw "IOException";

  switch (res.kind) {
    case "serializable":
      return res.content;
    case "proxy":
      return loadProxy(res.content);
    case "exception":
      throw res.content;
    case "promise":
      throw "Promises not yet supported!";
  }
}