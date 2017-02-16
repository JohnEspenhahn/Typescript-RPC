import { ClientConsumer } from "../public/ClientImpl";
import { ServerConsumer } from "../public/ServerConsumer";

export class ServerImpl extends ServerConsumer {
  private queue: string[] = [];
  
  constructor() {
    super();
  }

  protected enqueue(mss: string) {
    console.log("Enqueuing " + mss);
    this.queue.push(mss);

    // this.produce([ mss ]);

    return this.queue;
  }

  public produce(messages: string[]) {
    for (let c of this.consumers) {
      // c needs to be a proxy
      c.consume(messages);
    }
  }

}