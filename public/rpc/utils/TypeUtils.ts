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
}