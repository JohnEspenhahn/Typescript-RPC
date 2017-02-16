import { ProxyDef } from "./ProxyDef";

export type RMIResponse = SerializableResponse | ProxyResponse | PromiseResponse | ExceptionResponse;

export interface SerializableResponse {
  kind: "serializable";
  content: any;
}

export interface ProxyResponse {
  kind: "proxy";
  content: ProxyDef;
}

type PromiseEndpoint = string;
export interface PromiseResponse {
  kind: "promise";
  content: PromiseEndpoint;
}

export interface ExceptionResponse {
  kind: "exception";
  content: string;
}