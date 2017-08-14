import { UUID } from "./utils/UUID";

export const ProxyUUIDSymbol = Symbol("ProxyUUIDSymbol");
export const ProxyBroadcastAttributeSymbol = Symbol("ProxyBroadcastAttributeSymbol");

export abstract class Remote {

  constructor(uuid?: string) {
    this[ProxyUUIDSymbol] = uuid ? uuid : UUID.generate();
  }
  
}

Remote.prototype[ProxyBroadcastAttributeSymbol] = function(attribute_name: string, value: any) {
  throw new Error("ProxyBroadcastAttributeSymbol: Unimplemented");
}