"use strict";
// Create express/socket.io server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// Start RMI Regsitry
var _1 = require("./");
var registry = _1.RMIServerRegistry.get(io);
app.use(registry.express.middleware); // Allow http synchronous lookup
// Serve my instance
var ServerImpl_1 = require("./demo_private/ServerImpl");
registry.serve("server", new ServerImpl_1.ServerImpl());
// Project sepecific express routes
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/demo_public/index.html');
});
app.get('/jspm.config.js', function (req, res) {
    res.sendFile(__dirname + '/jspm.config.js');
});
app.get('/index.js', function (req, res) {
    res.sendFile(__dirname + '/index.js');
});
app.use('/', express.static('demo_public'));
app.use('/rpc', express.static('rpc'));
app.use('/node_modules', express.static('node_modules'));
app.use('/jspm_packages', express.static('jspm_packages'));
// Start the server
server.listen(8080);
//# sourceMappingURL=express_server.js.map