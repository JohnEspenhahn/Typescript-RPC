import { Remote } from '../Remote';

export module TypeUtils {
  export function isFunction(a: any): boolean {
    return typeof a === "function";
  }

  export function isGenerator(a: any): boolean {
    return a && a.constructor && a.constructor.name === 'GeneratorFunction';
  }

  export function isRemote(a: any): boolean {
    return a instanceof Remote;
  }

  export function isPrimative(a: any): boolean {
    return a === undefined || a === null || typeof a === "string" || typeof a === "number" || typeof a === "boolean";
  }

  export function isJSONable(a: any): boolean {
    if (isPrimative(a)) return true;
    else if (!(a instanceof Object)) return false;

    for (var key in a) {
      if (!isJSONable(a[key])) 
        return false;
    }

    return true;
  }
}