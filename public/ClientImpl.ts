import { Remote } from "./rpc/Remote";
import { ServerConsumer } from "./ServerConsumer";

export interface ClientProducer {
  produce(mss: string): void;
}

export abstract class ClientConsumer extends Remote {

   consume(messages: string[]) {
    for (let mss of messages)
      console.log(mss);
  }

}

export class ClientImpl extends ClientConsumer implements ClientProducer {

  constructor(private consumer: ServerConsumer) {
    super();
  }

  produce(mss: string) {
    var size = this.consumer.size();
    console.log(this.consumer.consume(`[${size}] mss`));
  }

}