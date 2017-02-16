let SSE = require('sse-nodejs');
let express = require('express');
import { Request, Response } from 'express';

import { ServerImpl } from './private/ServerImpl';
import { RMIServerRegistryImpl } from './private/rpc/RMIServerRegistryImpl';
 
var app = express();
 
app.get('/', function (req: Request, res: Response) {
   res.sendFile(__dirname+ '/index.html')
});
app.get('/app/main.js', function (req: Request, res: Response) {
   res.sendFile(__dirname+ '/main.js')
});
 
app.get('/time', function (req: Request, res: Response) {
    var serverSent = SSE(res);
 
    serverSent.sendEvent('time', function () {
        return new Date
    },1000);
    serverSent.disconnect(function () {
        console.log("disconnected");
    })
 
    serverSent.removeEvent('time',2000);
});

app.use('/app', express.static('public'));
app.use('/node_modules', express.static('node_modules'));


// Setup RMI
var registry = new RMIServerRegistryImpl();
registry.serve("server", new ServerImpl());
app.use(registry.express.middleware);
 
app.listen(3333);