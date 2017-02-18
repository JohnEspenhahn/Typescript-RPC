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
app.use('/', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/jspm_packages', express.static('jspm_packages'));

server.listen(8080);