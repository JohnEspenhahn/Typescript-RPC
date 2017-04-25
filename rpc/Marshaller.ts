import { TypeUtils } from './utils/TypeUtils';
import { RMIRegistry } from "./RMIRegistry";
import { RMIObject } from './RMIObject';
import { ProxyGenerator } from "./ProxyGenerator";

export class Marshaller {
  
  /// Given `arguments` apply marshal to all of them and return as an array
  public static marshal_args(args: IArguments): RMIObject[] {
    var res: RMIObject[] = [];
    for (var key in args) {
      var arg = args[key];
      res.push(Marshaller.marshal(arg));
    }

    return res;
  }

  /// Convert a javascript object to something that can be serialized/unserialized without too much loss
  public static marshal(res: any): RMIObject {
    var res_obj: RMIObject;
    if (res === null || res === undefined) {
      res_obj = { kind: "serializable", content: null };
    } else if (TypeUtils.isFunction(res) || TypeUtils.isGenerator(res)) {
      throw "Marshaller does not support sending functions as results yet";
    } else if (TypeUtils.isError(res)) {
      res_obj = { kind: "exception", content: JSON.stringify(res.message) };
    } else if (TypeUtils.isRemote(res)) {
      res_obj = { kind: "proxy", content: ProxyGenerator.serialize(res) };
    } else if (TypeUtils.isSerializableProxy(res)) {
      res_obj = { kind: "proxy", content: res };
    } else if (TypeUtils.isThenable(res)) {
      throw "Promises not yet supported";
    } else if (TypeUtils.isJSONable(res)) {
      res_obj = { kind: "serializable", content: res };
    } else {
      throw "Unhandled content: " + res;
    }

    if (RMIRegistry.DEBUG) console.log("Marshalled: " + JSON.stringify(res_obj));

    return res_obj;
  }

  /// Given an RMIObject loaded from the socket and turn it back into a normal javascript object
  public static demarshal(res: RMIObject, source: RMI.Socket): any {
    if (RMIRegistry.DEBUG) console.log("Demarshalling: " + res);

    var kind = res.kind;
    switch (kind) {
      case "serializable":
        return res.content;
      case "proxy":
        return ProxyGenerator.deserialize(res.content, source);
      case "promise":
        throw "Promises not yet supported!";
      case "exception":
        throw res.content;
      default:
        throw new Error("Unhandled RMIObject kind " + kind);
    }
  }
  
  /// Given a list of RMIObjects apply demarshal to them and return as an array
  public static demarshal_args(res: RMIObject[], source: RMI.Socket): any[] {
    var dm: any[] = [];
    for (var r of res) dm.push(Marshaller.demarshal(r, source));
    return dm;
  }

}