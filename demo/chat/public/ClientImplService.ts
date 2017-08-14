import { Injectable } from '@angular/core';

import { RMIClientRegistry } from "../../../index";

import { ClientImpl } from "./ClientImpl";
import { ServerConsumer } from "./ServerConsumer";

@Injectable()
export class ClientImplService {
  private readonly server: ServerConsumer;
  private _client: ClientImpl;

  constructor() {
    var registry = RMIClientRegistry.get();
    this.server = registry.lookup_sync<ServerConsumer>("server");
  }

  get client(): ClientImpl {
    if (this._client) 
      return this._client;

    // Create a client with a dummy id (number 0-99)
    this._client = new ClientImpl("" + ~~(Math.random()*100), this.server);
    this._client.connect();
    
    return this._client;
  }

}