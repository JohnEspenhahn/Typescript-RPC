"use strict";
// Create express/socket.io server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// Start RMI Regsitry
var RMIServerRegistry_1 = require("./rpc/RMIServerRegistry");
var registry = RMIServerRegistry_1.RMIServerRegistry.get(io);
app.use(registry.express.middleware); // Allow synchronous lookup
// Serve my instance
var ServerImpl_1 = require("./demo_private/ServerImpl");
registry.serve("server", new ServerImpl_1.ServerImpl());
// Project sepecific express routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/jspm.config.js', function (req, res) {
    res.sendFile(__dirname + '/jspm.config.js');
});
app.use('/', express.static('demo_public'));
app.use('/rpc', express.static('rpc'));
app.use('/node_modules', express.static('node_modules'));
app.use('/jspm_packages', express.static('jspm_packages'));
// Start the server
server.listen(8080);
//# sourceMappingURL=/home/tim/Desktop/TS RPC/Typescript-RPC/ts-node-1fc90f464345a82d8eb8eee0683b64cadfb994e7/c1a4f3436826c071809804b505523055ec8b48b1/185d8c3779491938e16732d2b610f3a94ad42ee6.js.map