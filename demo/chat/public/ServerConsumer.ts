import { Remote } from "../../../index";
import { ClientConsumer } from "./ClientImpl";

// Server functions that are made available to remote
export abstract class ServerConsumer extends Remote {
  protected consumers: ClientConsumer[];

  constructor() {
    super();
    
    this.consumers = [];
  }

  async addConsumer(client: ClientConsumer) {
    this.consumers.push(client);
  }

  async getConsumers(): Promise<ClientConsumer[]> {
    return this.consumers;
  }

  async consume(msg: string) {
    this.produce(msg);
  }

  protected abstract produce(msg: string): void;
}