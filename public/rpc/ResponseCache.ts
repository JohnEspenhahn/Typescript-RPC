import { RMIRegistry } from "./RMIRegistry";
import { Demarshaller } from "./Demarshaller";
import { RMIObject, RMIResponse } from './RMIObject';

type ResolveFunction = (value: any) => void;

export class ResponseCache {
  
  private static outstanding: { [id: string]: ResolveFunction } = {};

  public static on(call_uuid: string, resolve: ResolveFunction) {
    ResponseCache.outstanding[call_uuid] = resolve;
  }

  public static handle(rsp: RMIResponse, source: SocketIO.Socket) {
    var resolve = ResponseCache.outstanding[rsp.call_uuid];
    if (!resolve) return;

    if (RMIRegistry.DEBUG) console.log('handling response ' + JSON.stringify(rsp));

    delete ResponseCache.outstanding[rsp.call_uuid];
    resolve(Demarshaller.demarshal(rsp.response, source));
  }

}