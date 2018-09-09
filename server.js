//process.execArgv[0] = process.execArgv[0].replace('-brk', '');
"use strict";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const https = require('https');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const express = require('express');
const staticFileMiddleware = express.static('client/dist', {});
const staticImagesMiddleware = express.static('uploads', {});

const history = require('connect-history-api-fallback');
const cors = require('cors');

const fs = require('fs');

const key  = fs.readFileSync('ssl/key.pem', 'utf8');
const cert = fs.readFileSync('ssl/cert.pem', 'utf8');
const credentials = {key, cert};

const httpsListenPort = 8001;

const app = express();

let httpsServer = https.createServer(credentials, app);

httpsServer.listen(httpsListenPort);
    
console.log(`https server listen on ${httpsListenPort} port.`);

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

app.use(compression({
    filter: function (req, res) {
      return true;
    }
}));

app.use('/api', cors());

app.use('/api', require('./router')(require('socket.io')(httpsServer)));

app.use('/api', cors());

app.use(staticFileMiddleware);

app.use(history({
    disableDotRule: false,
    verbose: false
}));

app.use(staticFileMiddleware);
app.use(staticImagesMiddleware);
