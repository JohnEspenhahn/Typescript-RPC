// Create express/socket.io server
let express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Start RMI Regsitry
import { RMIServerRegistry } from './index';
var registry: RMIServerRegistry = RMIServerRegistry.get(io);
app.use(registry.express.middleware); // Allow http synchronous lookup

// Demo specific routing
import { ServerImpl } from './demo/chat/ServerImpl';
registry.serve("server", new ServerImpl());
 
app.get('/', function (req: any, res: any) {
   res.sendFile(__dirname+ '/demo/chat/public/index.html')
});
app.use('/', express.static('demo/chat/public'));

// RPC code routing
app.get('/jspm.config.js', function (req: any, res: any) {
   res.sendFile(__dirname+ '/jspm.config.js')
});
app.get('/index.js', function (req: any, res: any) {
   res.sendFile(__dirname+ '/index.js')
});

app.use('/rpc', express.static('rpc'));
app.use('/node_modules', express.static('node_modules'));
app.use('/jspm_packages', express.static('jspm_packages'));

// Start the server
server.listen(8080);