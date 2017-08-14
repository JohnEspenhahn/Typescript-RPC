import { SerializableProxy } from "./SerializableProxy";

export type RMIObject = SerializableObject | ProxyObject | PromiseObject | ExceptionObject | IterableObject;

export interface SerializableObject {
  kind: "serializable";
  content: any;
}

export interface ProxyObject {
  kind: "proxy";
  content: SerializableProxy;
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

export interface IterableObject {
  kind: "iterable";
  content: RMIObject[];
}