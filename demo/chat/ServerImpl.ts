import { ClientConsumer } from "./public/ClientImpl";
import { ServerConsumer } from "./public/ServerConsumer";

export class ServerImpl extends ServerConsumer {  
  constructor() {
    super();
  }

  public produce(msg: string) {
    for (let c of this.consumers)
      c.consume(msg);
  }

}