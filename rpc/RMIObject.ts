import { ProxyDef } from "./ProxyDef";

export type RMIObject = SerializableObject | ProxyObject | PromiseObject | ExceptionObject;

export interface SerializableObject {
  kind: "serializable";
  content: any;
}

export interface ProxyObject {
  kind: "proxy";
  content: ProxyDef;
}

type PromiseEndpoint = string;
export interface PromiseObject {
  kind: "promise";
  content: PromiseEndpoint;
}

export interface ExceptionObject {
  kind: "exception";
  content: string;
}