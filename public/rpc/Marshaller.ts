import { TypeUtils } from './utils/TypeUtils';
import { ProxyDefCache } from './ProxyDef';
import { InvokeReponse } from './ResponseInvoke';

export class Marshaller {
  
  public static args(args: IArguments): string {
    var res = [];
    for (var key in args) {
      var arg = args[key];
      if (arg === null || arg === undefined) {
        res.push(null);
      } else if (TypeUtils.isFunction(arg) || TypeUtils.isGenerator(arg)) {
        throw "Marshaller does not support sending function arguments yet";
      } else if (TypeUtils.isRemote(arg)) {
        throw "Marshaller does not support sending Remote objects yet";
      } else {
        res.push(arg);
      }
    }

    return JSON.stringify(res);
  }

  public static invoke_result(res: any): string {
    var res_obj: InvokeReponse;
    if (res === null || res === undefined) {
      res_obj = { kind: "serializable", content: null };
    } else if (TypeUtils.isFunction(res) || TypeUtils.isGenerator(res)) {
      throw "Marshaller does not support sending functions as results yet";
    } else if (TypeUtils.isRemote(res)) {
      res_obj = { kind: "proxy", content: ProxyDefCache.load(res).proxy };
    } else {
      res_obj = { kind: "serializable", content: res };
    }

    return JSON.stringify(res_obj);
  }

}