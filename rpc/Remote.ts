import { UUID } from "./utils/UUID";

export abstract class Remote {

  constructor(uuid?: string) {
    this.__proxy_uuid = uuid ? uuid : UUID.generate();
  }

  readonly __proxy_uuid: string;
  
  __broadcast_attribute(attribute_name: string, value: any): void {
    throw new Error("__broadcast_attribute: Unimplemented");
  }
}