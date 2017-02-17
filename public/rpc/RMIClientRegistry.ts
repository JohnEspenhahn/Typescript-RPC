import { ProxyDef } from "./ProxyDef";
import { ProxyGenerator } from "./ProxyGenerator";
import { RMIRegistry } from "./RMIRegistry";
import { ProxyResponse } from "./RMIResponse";
import { RemoteInvoker } from "./RemoteInvoker";

export class RMIClientRegistry extends RMIRegistry {
  public lookup<T>(path: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      RemoteInvoker.invoke_async(`/${RMIRegistry.RMI_BASE}/lookup/${path}`, [], (res: ProxyResponse) => {
        if (res == null) return reject();
        else resolve(ProxyGenerator.load(res.content));
      });
    });
  }
}