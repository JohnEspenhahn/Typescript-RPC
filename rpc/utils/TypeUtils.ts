import { Remote } from '../Remote';
import { SerializableProxy } from "../SerializableProxy";

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

  export function isSerializableProxy(a: any): a is SerializableProxy {
    return a instanceof SerializableProxy;
  }

  export function isPrimative(a: any): boolean {
    return a === undefined || a === null || typeof a === "string" || typeof a === "number" || typeof a === "boolean";
  }

  export function isError(a: any): a is Error {
    return a instanceof Error;
  }

  export function isIterable(a: any): a is Iterable<any> {
    return typeof a !== "string" && Object.getPrototypeOf(a).hasOwnProperty(Symbol.iterator);
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