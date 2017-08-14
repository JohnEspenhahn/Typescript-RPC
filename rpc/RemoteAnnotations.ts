import { TypeUtils } from "./utils/TypeUtils";
import { UUID } from "./utils/UUID";

export namespace RemoteAnnotations {  

  export function ReadHeavy(target: any, attribute_name: string, descriptor: PropertyDescriptor) {
    if (descriptor.value || !descriptor.get) {
      throw new Error("@ReadHeavy can only be used on a 'get' accessor");
    }

    // Marker for serialization
    (<any> descriptor.get).__readHeavy = true;

    let set = descriptor.set;
    if (TypeUtils.isFunction(set)) {
      let get = descriptor.get;
      descriptor.set = function(value: any) {
        // throw new Error("set is not yet supported for @ReadHeavy accessors");
        set.call(this, value);
        if (TypeUtils.isFunction(this.__broadcast_attribute))
          this.__broadcast_attribute(attribute_name, get.call(this));
        else
          throw new Error("Invalid call to set on a @ReadHeavy accessor that is not part of a Remote object");
      };
    }
  }

}