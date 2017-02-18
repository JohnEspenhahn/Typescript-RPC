import { UUID } from "./utils/UUID";

export abstract class Remote {

  constructor(uuid?: string) {
    this.__proxy_uuid = uuid ? uuid : UUID.generate();
  }

  // Remote reflection markers
  public static readonly EXPORT = "__proxy_protokey";
  private __proxy_protokey() { }
  private __proxy_uuid: string;

  get proxy_uuid() {
    return this.__proxy_uuid;
  }
}