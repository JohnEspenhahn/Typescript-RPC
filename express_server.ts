// Create express/socket.io server
let express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Start RMI Regsitry
import { RMIServerRegistry } from './';
var registry: RMIServerRegistry = RMIServerRegistry.get(io);
app.use(registry.express.middleware); // Allow http synchronous lookup

// Serve my instance
import { ServerImpl } from './demo_private/ServerImpl';
registry.serve("server", new ServerImpl());
 
// Project sepecific express routes
app.get('/', function (req: any, res: any) {
   res.sendFile(__dirname+ '/demo_public/index.html')
});
app.get('/jspm.config.js', function (req: any, res: any) {
   res.sendFile(__dirname+ '/jspm.config.js')
});
app.get('/index.js', function (req: any, res: any) {
   res.sendFile(__dirname+ '/index.js')
});

app.use('/', express.static('demo_public'));

app.use('/rpc', express.static('rpc'));
app.use('/node_modules', express.static('node_modules'));
app.use('/jspm_packages', express.static('jspm_packages'));

// Start the server
server.listen(8080);