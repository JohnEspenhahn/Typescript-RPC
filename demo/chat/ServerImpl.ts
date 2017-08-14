import { ClientConsumer } from "./public/ClientImpl";
import { ServerConsumer } from "./public/ServerConsumer";
import { RPCError } from "../../rpc/RPCError";

export class ServerImpl extends ServerConsumer { 

  constructor() {
    super();
  }

  protected produce(msg: string) {
    this.consumers = this.consumers.filter((client) => {
      try {
        client.consume(msg);
        return true;
      } catch (e) {
        return false;
      }
    });
  }

}