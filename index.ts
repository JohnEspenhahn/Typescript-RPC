let SSE = require('sse-nodejs');
let express = require('express');
import { Request, Response } from 'express';
 
var app = express();
 
app.get('/', function (req: Request, res: Response) {
   res.sendFile(__dirname+ '/index.html')
});
app.get('/main.js', function (req: Request, res: Response) {
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
 
app.listen(3333);