import { RMIRegistry } from "./public/rpc/RMIRegistry";
import { RMIServerRegistry } from './private/rpc/RMIServerRegistry';

export = function(server: any): RMIRegistry {
  var io = require('socket.io')(server);

  // Setup RMI
  return RMIServerRegistry.get(io);
};
