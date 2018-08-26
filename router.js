'use strict'

const express = require('express');

let router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false}));

let types = require('./api');

let patterns = ['/:type\::id\.:action', '/:type\.:action', '/:type\::id', '/:type'];


let processToken = function(req, res, next) {
    let { type, id, action } = req.params;

    console.log('---------------BEGIN-----------------');
    console.log('REQUEST:', req.path);
    console.log('---------------BEGIN-----------------');

    type = type.toLowerCase();
    !types[type] && (type = 'unknown');

    let object = new types[type]({ token: req.headers.authorization, id, io, req, res });
    req.object = object;

    next();
};

let proccedRequest = async function(req, res) {
    
    let { action } = req.params;

    let object = req.object;

    !object[action] && (action = 'default');

    let executor = action ? object[action].bind(object) : object.default.bind(object);

    let params = Object.keys(req.body).length === 0 ? req.query : req.body;
    let result = await executor(params, req, res);

    let { token, auth, error } = object;

    console.log('----------------END------------------');
    console.log('RESPONSE:', req.path);
    console.log('RESULT:', result);
    console.log('----------------END------------------');

    return { token, auth, error, ...result } || {};
};

let io = void 0;

router.all(patterns, processToken, async (req, res, next) => {
    try {
        let response = await proccedRequest(req, res);
        res.json(response).end();
    }
    catch(err) {
        let error = {
            code: err.code,
            message: err.message,
            data: {},
            system: true
        }
        console.log('ERROR => ', err);

        res.json({error}).end();
    }

    
}); 

let socketInitialize = function(sockets) {
    io = sockets;

    sockets.on('connection', (socket) => {
     
        socket.on('request', async (data, cb) => {
            let { type, id, action, authorization, body, method = 'GET' } = data;
            let req = {
                params: { type, id, action },
                headers: { authorization },
                body,
                method
            };

            let response = await proccedRequest(req);

            cb(response);
        });
      
    });
}

process.on('unhandledRejection', err => {
    console.log('unhandledRejection => ', err);
});

module.exports = function(io) {
    socketInitialize(io);

    return router;
}