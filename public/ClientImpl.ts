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
    this.consumer.size().then((size: number) => {
      this.consumer.consume(`[${size}] mss`).then((res: string[]) => {
        console.log(res);
      });
    });
  }

}