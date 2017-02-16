import { ProxyDefCache } from './ProxyDefCache';
import { TypeUtils } from './utils/TypeUtils';
import { RMIResponse } from './RMIResponse';

export class Marshaller {
  
  public static marshal_args(args: IArguments): RMIResponse[] {
    var res = [];
    for (var key in args) {
      var arg = args[key];
      res.push(Marshaller.marshal(arg));
    }

    return res;
  }

  public static marshal(res: any): RMIResponse {
    var res_obj: RMIResponse;
    if (res === null || res === undefined) {
      res_obj = { kind: "serializable", content: null };
    } else if (TypeUtils.isFunction(res) || TypeUtils.isGenerator(res)) {
      throw "Marshaller does not support sending functions as results yet";
    } else if (TypeUtils.isRemote(res)) {
      res_obj = { kind: "proxy", content: ProxyDefCache.load(res).proxy };
    } else if (TypeUtils.isJSONable(res)) {
      res_obj = { kind: "serializable", content: res };
    } else {
      throw "Unhandled content: " + res;
    }

    console.log("Marshalled: " + JSON.stringify(res_obj));

    return res_obj;
  }

}