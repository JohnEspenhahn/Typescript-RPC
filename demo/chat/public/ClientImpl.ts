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

    this.messages.unshift((source ? `${source.name}:` : '') + msg);
  }

  @RemoteAnnotations.ReadHeavy
  get name() { return this._name }
  set name(name: string) { this._name = name }
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

  onPeerDisconnected(peer: ClientConsumer) {
    
  }

}