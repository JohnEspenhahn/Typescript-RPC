import { ClientConsumer } from "../demo_public/ClientImpl";
import { ServerConsumer } from "../demo_public/ServerConsumer";

export class ServerImpl extends ServerConsumer {  
  constructor() {
    super();
  }

  public produce(msg: string) {
    for (let c of this.consumers)
      c.consume(msg);
  }

}