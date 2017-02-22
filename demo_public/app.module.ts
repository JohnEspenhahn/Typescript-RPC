import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }  from './app.component';
import { ClientImplService } from "./ClientImplService";

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule 
  ],

  /// Register our components/services with Angular
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ 
    ClientImplService
  ]
})
export class AppModule { }