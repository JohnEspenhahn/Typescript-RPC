import { Component } from '@angular/core';

import { ClientImplService } from "./ClientImplService";
import { ClientImpl } from "./ClientImpl";

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

}