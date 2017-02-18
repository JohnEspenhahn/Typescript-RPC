import { Injectable } from '@angular/core';

import { RMIClientRegistry } from '../RMIClientRegistry';

@Injectable()
export class RMIClientRegistryService {
  public readonly registry: RMIClientRegistry;

  constructor() {
    var socket = io.connect() as any;
    this.registry = RMIClientRegistry.get(socket);
  }

}