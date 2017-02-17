import { RMIClientRegistry } from "./rpc/RMIClientRegistry";
import { ClientImpl, ClientProducer } from "./ClientImpl";
import { ServerConsumer } from "./ServerConsumer";

export function start() {
  var reg = new RMIClientRegistry();
  reg.lookup("server").then((server: ServerConsumer) => {
    let client: ClientProducer = new ClientImpl(server);
    client.produce("Produced 1");
  });
}