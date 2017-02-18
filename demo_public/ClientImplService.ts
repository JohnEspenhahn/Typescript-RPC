import { Injectable } from '@angular/core';

import { RMIClientRegistryService } from "../rpc/angular2/RMIClientRegistryService";

import { ClientImpl } from "./ClientImpl";
import { ServerConsumer } from "./ServerConsumer";

@Injectable()
export class ClientImplService {
  public readonly client: ClientImpl;

  constructor(private registryService: RMIClientRegistryService) {
    var server = registryService.registry.lookup_sync<ServerConsumer>("server");
    this.client = new ClientImpl(server);
  }

}