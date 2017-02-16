import { ClientConsumer } from "../public/ClientImpl";
import { ServerConsumer } from "../public/ServerConsumer";

export class ServerImpl extends ServerConsumer {
  
  constructor() {
    super();
  }

  protected enqueue(mss: string) {
    console.log("Enqueuing " + mss);
    this.produce([ mss ]);
  }

  public produce(messages: string[]) {
    for (let c of this.consumers) {
      // c needs to be a proxy
      c.consume(messages);
    }
  }

}