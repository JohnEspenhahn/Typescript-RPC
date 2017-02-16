import { Remote } from "./Remote";

export interface ProxyDef {
  uuid: string;
  methods: MethodDef[];
}

export interface MethodDef {
  name: string;
  kind: "sync" | "async";
}

export interface ProxyDefPair {
  self: Remote;
  proxy: ProxyDef;
}