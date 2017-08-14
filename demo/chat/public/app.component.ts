import { Component } from '@angular/core';

import { ClientImplService } from "./ClientImplService";
import { ClientImpl, ClientConsumer } from "./ClientImpl";

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  model = { message: "" };
 
  constructor(private clientService: ClientImplService) { }

  get client() {
    return this.clientService.client;
  }

  send() {
    this.client.produce(this.model.message);
  }

  directMessage(peer: ClientConsumer) {
    try {
      peer.consume(prompt("DM to " + peer.name), this.client);
    } catch {
      this.client.onPeerDisconnected(peer);
    }
  }

  changeName() {
    let name = prompt("What would you like to change your name to?");
    if (name) this.client.name = name;
  }

}