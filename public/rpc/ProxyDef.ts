import { Remote } from "./Remote";

export class ProxyDef {

  constructor(public uuid: string, public methods: string[]) { }

}

export interface ProxyDefPair {
  self: Remote;
  proxy: ProxyDef;
}