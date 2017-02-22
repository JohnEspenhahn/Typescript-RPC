import { Remote } from '../Remote';
import { ProxyDef } from "../ProxyDef";

export module TypeUtils {
  export function isFunction(a: any): a is Function {
    return typeof a === "function";
  }

  export function isGenerator(a: any): a is GeneratorFunction {
    return a && a.constructor && a.constructor.name === 'GeneratorFunction';
  }

  export function isRemote(a: any): a is Remote {
    return a instanceof Remote;
  }

  export function isThenable(a: any): a is Thenable {
    return a && typeof a.then === "function";
  }

  export function isProxyDef(a: any): a is ProxyDef {
    return a instanceof ProxyDef;
  }

  export function isPrimative(a: any): boolean {
    return a === undefined || a === null || typeof a === "string" || typeof a === "number" || typeof a === "boolean";
  }

  export function isError(a: any): a is Error {
    return a instanceof Error;
  }

  export function isJSONable(a: any): a is Object {
    if (isPrimative(a)) return true;
    else if (!(a instanceof Object)) return false;

    for (var key in a) {
      if (!isJSONable(a[key])) 
        return false;
    }

    return true;
  }
}