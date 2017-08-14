import { Remote } from "./Remote";
import { TypeUtils } from "./utils/TypeUtils";

/// An object which has a unique id and a list of methods that can be invoked remotly
/// Needs to be a class because need to know it is a SerializableProxy when marshalling
export class SerializableProxy {
  public readonlyValues?: { [id:string]: any };
  public methods: string[];
  public uuid: string;

  constructor(remote: Remote) {
    this.createFromRemote(remote);
  }

  private createFromRemote(remote: Remote) {
    // Get prototype right above Remote
    let remote_proto_parent = Object.getPrototypeOf(remote);
    let remote_proto = remote_proto_parent;
    while (remote_proto != Remote.prototype) {
      remote_proto_parent = remote_proto;
      remote_proto = Object.getPrototypeOf(remote_proto);
    }

    // Get all the functions/readonly-values to export
    let methods: string[] = [];
    let readonlyValues: { [id:string]: any } = { };
    let propertyNames = Object.getOwnPropertyNames(remote_proto_parent);
    for (let propName of propertyNames) {
      if (propName === "constructor") continue;
      
      // Specify fields
      let field = remote_proto_parent[propName];
      if (TypeUtils.isFunction(field)) {
        methods.push(propName);
      } else {
        // Check for special flags
        let descriptor = Object.getOwnPropertyDescriptor(remote_proto_parent, propName);
        if (descriptor && descriptor.get && Object.getOwnPropertyDescriptor(descriptor.get, '__readHeavy'))
          readonlyValues[propName] = remote[propName];
      }
    }

    this.methods = methods;
    this.uuid = remote.__proxy_uuid;

    if (Object.keys(readonlyValues).length > 0)
      this.readonlyValues = readonlyValues;
  }

}