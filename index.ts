let express = require('express');
import { Request, Response } from 'express';
 
var app = express();
var server = require('http').Server(app);

import { RMIRegistry } from './public/rpc/RMIRegistry';
var registry: RMIRegistry = require("./rpc")(server);

import { ServerImpl } from './private/ServerImpl';
var rpc_server: ServerImpl = new ServerImpl();
registry.serve("server", rpc_server);
 
app.get('/', function (req: Request, res: Response) {
   res.sendFile(__dirname+ '/index.html')
});
app.get('/app/main.js', function (req: Request, res: Response) {
   res.sendFile(__dirname+ '/main.js')
});

app.use('/', express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use('/node_modules/app', express.static('node_modules'));

server.listen(80);