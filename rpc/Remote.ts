import { UUID } from "./utils/UUID";

export abstract class Remote {

  constructor(uuid?: string) {
    this.__proxy_uuid = uuid ? uuid : UUID.generate();
  }

  public readonly __proxy_uuid: string;
}