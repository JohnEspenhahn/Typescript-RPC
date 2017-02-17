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

  public async consume(mss: string): Promise<string[]> {
    this.queue.push(mss);
    return this.queue;
  }

  public async size(): Promise<number> {
    return this.queue.length;
  }
}