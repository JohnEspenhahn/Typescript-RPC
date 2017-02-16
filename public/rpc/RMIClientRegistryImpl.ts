import { Remote } from "./Remote";
import { ProxyDef } from "./ProxyDef";
import { ProxyCache } from "./ProxyCache";
import { Marshaller } from "./Marshaller";
import { RMIResponse } from "./RMIResponse";
import { RMIRegistry } from "./RMIRegistry";
import { HttpClient } from "./utils/HttpClient";

export class RMIClientRegistryImpl extends RMIRegistry {
  public lookup<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      HttpClient.get(`/${RMIRegistry.RMI_BASE}/lookup/${path}`, (def: ProxyDef) => {
        if (def == null) return reject();
        else resolve(ProxyCache.loadProxy(def));
      });
    });
  }

  public serve(path: string, obj: Remote): boolean {
    throw "Client doees not support serve yet";
  }
}