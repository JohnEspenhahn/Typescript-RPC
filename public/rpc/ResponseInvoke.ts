import { ProxyDef } from "./ProxyDef";

export type InvokeReponse = InvokeSerializableResponse | InvokeProxyResponse | InvokePromiseResponse;

export interface InvokeSerializableResponse {
  kind: "serializable";
  content: any;
}

export interface InvokeProxyResponse {
  kind: "proxy";
  content: ProxyDef;
}

type PromiseEndpoint = string;
export interface InvokePromiseResponse {
  kind: "promise";
  content: PromiseEndpoint;
}