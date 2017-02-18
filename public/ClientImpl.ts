import { Remote } from "./rpc/Remote";
import { ServerConsumer } from "./ServerConsumer";

export interface ClientProducer {
  produce(mss: string): void;
}

export abstract class ClientConsumer extends Remote {

  consume(msg: string) {
    console.log(msg);
  }

}

export class ClientImpl extends ClientConsumer implements ClientProducer {

  constructor(private consumer: ServerConsumer) {
    super();

    this.consumer.add(this);
  }

  produce(msg: string) {
    this.consumer.consume(msg);
  }

}