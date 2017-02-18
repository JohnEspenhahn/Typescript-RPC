import { Injectable } from '@angular/core';

import { RMIClientRegistryService } from "./rpc/angular2/RMIClientRegistryService";

import { ClientImpl } from "./ClientImpl";
import { ServerConsumer } from "./ServerConsumer";

@Injectable()
export class ClientImplService {
  private _client: ClientImpl;

  constructor(private registryService: RMIClientRegistryService) {
    registryService.lookup("server").then((server: ServerConsumer) => {
      this._client = new ClientImpl(server);
    });
  }

  public async getClient(): Promise<ClientImpl> {
    return this._client;
  }

}