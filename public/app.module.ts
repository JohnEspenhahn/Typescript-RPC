import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { ClientImplService } from "./ClientImplService";
import { RMIClientRegistryService } from "./rpc/angular2/RMIClientRegistryService";

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule 
  ],

  /// Register our components/services with Angular
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ 
    ClientImplService,
    RMIClientRegistryService
  ]
})
export class AppModule { }