// Create express/socket.io server
let express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Start RMI Regsitry
import { RMIServerRegistry } from './private/rpc/RMIServerRegistry';
var registry: RMIServerRegistry = RMIServerRegistry.get(io);

// Serve my instance
import { ServerImpl } from './private/ServerImpl';
registry.serve("server", new ServerImpl());
app.use(registry.express.middleware); // Allow synchronous lookup
 
// Express routes
app.get('/', function (req: any, res: any) {
   res.sendFile(__dirname+ '/index.html')
});
app.use('/', express.static('dist'));

server.listen(8080);