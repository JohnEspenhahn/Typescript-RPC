import { Remote } from "./Remote";

/// An object which has a unique id and a list of methods that can be invoked remotly
/// Needs to be a class because need to know it is a ProxyDef when marshalling
export class ProxyDef {
  constructor(public uuid: string, public methods: string[]) { }
}

/// Combine the ProxyDef with the original object
export interface ProxyDefPair {
  self: Remote;
  proxy: ProxyDef;
}