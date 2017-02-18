import { Remote } from "../rpc/Remote";
import { ClientConsumer } from "./ClientImpl";

// Server functions that are made available to remote
export abstract class ServerConsumer extends Remote {
  protected consumers: ClientConsumer[];

  constructor() {
    super();
    
    this.consumers = [];
  }

  public add(client: ClientConsumer) {
    this.consumers.push(client);
  }

  public consume(msg: string) {
    this.produce(msg);
  }

  public abstract produce(msg: string): void;
}