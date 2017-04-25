import { Remote } from "./Remote";
import { TypeUtils } from "./utils/TypeUtils";

/// An object which has a unique id and a list of methods that can be invoked remotly
/// Needs to be a class because need to know it is a SerializableProxy when marshalling
export class SerializableProxy {
  public methods: string[];
  public uuid: string;

  constructor(remote: Remote) {
    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(remote);
    let remote_proto = remote_proto_parent;
    while (remote_proto != Remote.prototype) {
      remote_proto_parent = remote_proto;
      remote_proto = Object.getPrototypeOf(remote_proto);
    }

    // Get all the functions to export
    var methods: string[] = [];
    let keys = Object.getOwnPropertyNames(remote_proto_parent);
    for (let key of keys) {
      if (key === "constructor") continue;
      
      var field = remote_proto_parent[key];
      if (TypeUtils.isFunction(field)) {
        methods.push(key);
      }
    }

    this.methods = methods;
    this.uuid = remote.__proxy_uuid;
  }

}