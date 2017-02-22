import { Remote } from "../index";
import { ServerConsumer } from "./ServerConsumer";

// Functions in classes that extend Remote will be exported
export abstract class ClientConsumer extends Remote {
  messages: string[] = [];

  consume(msg: string) {
    if (this.messages.length > 10)
      this.messages.pop();

    this.messages.unshift(msg);
  }

}

export class ClientImpl extends ClientConsumer {

  constructor(private consumer: ServerConsumer) {
    super();

    this.consumer.add(this);
  }

  produce(msg: string) {
    this.consumer.consume(msg);
  }

}