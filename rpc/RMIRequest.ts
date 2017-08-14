import { RMIObject } from "./RMIObject";

export type RMIRequest = RMILookupRequest;

export interface RMILookupRequest {
  path: string;
}

export interface RMIInvokeRequest {
  ProxyUUIDSymbol: string;
  fn_name: string;
  args: RMIObject[];
}