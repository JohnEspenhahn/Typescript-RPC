import { Injectable } from '@angular/core';

import { RMIClientRegistry } from "../../../index";

import { ClientImpl } from "./ClientImpl";
import { ServerConsumer } from "./ServerConsumer";

@Injectable()
export class ClientImplService {
  public readonly client: ClientImpl;

  constructor() {
    var registry = RMIClientRegistry.get();
    var server = registry.lookup_sync<ServerConsumer>("server");
    this.client = new ClientImpl(server);
  }

}