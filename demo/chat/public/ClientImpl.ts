import { Remote, RemoteAnnotations } from "../../../index";
import { ServerConsumer } from "./ServerConsumer";

// Functions in classes that extend Remote will be exported
export class ClientConsumer extends Remote {
  private messages: string[] = [];

  constructor(private _name: string) {
    super();
  }

  async consume(msg: string, source: ClientConsumer = null) {
    if (this.messages.length > 10)
      this.messages.pop();

    this.messages.unshift((source ? 'DM:' : '') + msg);
  }

  @RemoteAnnotations.ReadHeavy
  get name() { 
    return this._name;
  }
}

export class ClientImpl extends ClientConsumer {
  private connected: boolean;
  private peers: Promise<ClientConsumer[]>;

  constructor(name: string, private server: ServerConsumer) {
    super(name);

    this.connected = false;
  }

  async connect() {
    this.peers = this.server.getConsumers();
    await this.server.addConsumer(this);
    
    this.connected = true;
  }

  async produce(msg: string) {
    if (this.connected)
      this.server.consume(msg);
  }

}