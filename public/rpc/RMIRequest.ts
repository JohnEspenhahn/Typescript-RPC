import { RMIObject } from "./RMIObject";

export type RMIRequest = RMILookupRequest;

export interface RMILookupRequest {
  call_uuid: string;
  path: string;
}

export interface RMIInvokeRequest {
  proxy_uuid: string;
  call_uuid: string;
  fn_name: string;
  args: RMIObject[];
}