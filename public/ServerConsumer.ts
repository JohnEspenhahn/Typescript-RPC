import { Remote } from "./rpc/Remote";
import { ClientConsumer } from "./ClientImpl";

export abstract class ServerConsumer extends Remote {
  protected consumers: ClientConsumer[];
  protected queue: string[];

  constructor() {
    super();
    
    this.consumers = [];
    this.queue = [];
  }

  public add(client: ClientConsumer) {
    this.consumers.push(client);
  }

  public consume(mss: string): string[] {
    this.queue.push(mss);
    return this.queue;
  }

  public size(): number {
    return this.queue.length;
  }
}