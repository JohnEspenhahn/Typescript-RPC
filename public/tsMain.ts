import { RMIClientRegistry } from "./rpc/RMIClientRegistry";
import { ClientImpl, ClientProducer } from "./ClientImpl";
import { ServerConsumer } from "./ServerConsumer";
var io = require('socket.io');

export function start() {
  var socket = io.connect(location.host);
  var reg = RMIClientRegistry.get(socket);
  reg.lookup("server").then((server: ServerConsumer) => {
    let client: ClientProducer = new ClientImpl(server);
    client.produce("Produced 1");
  });
}