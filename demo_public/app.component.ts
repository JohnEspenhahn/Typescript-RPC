import { Component } from '@angular/core';

import { ClientImplService } from "./ClientImplService";
import { ClientImpl } from "./ClientImpl";

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  model = { message: "" };
  client: ClientImpl;
 
  constructor(clientService: ClientImplService) {
    this.client = clientService.client;
  }

  send() {
    this.client.produce(this.model.message);
  }

}