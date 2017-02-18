import { Component } from '@angular/core';

import { ClientImplService } from "./ClientImplService";

@Component({
  selector: 'app',
  template: `<h1>Hello {{name}}</h1>`
})
export class AppComponent { 
 
  constructor(client: ClientImplService) {
    
  }

}