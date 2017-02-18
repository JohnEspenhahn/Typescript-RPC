import { Injectable } from '@angular/core';

import { Remote } from "../Remote";
import { RMIClientRegistry } from '../RMIClientRegistry';

@Injectable()
export class RMIClientRegistryService {
  private registry: RMIClientRegistry;

  constructor() {
    var socket = io.connect() as any;
    this.registry = RMIClientRegistry.get(socket);
  }

  public lookup<T extends Remote>(path: string): Promise<T> {
    return this.registry.lookup(path);
  }

}