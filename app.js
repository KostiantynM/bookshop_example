"use strict"
/*require('babel-core/register')({
    "presets": ["es2015", "react", "stage-1"]
});*/
//var setUpConnection = require('./utils/utils.js');
import setUpConnection from './utils/utils.js';
//var express = require('express');
import express from 'express';
//var path = require('path');
import path from 'path';
//var favicon = require('static-favicon');
import favicon from 'static-favicon';
//var logger = require('morgan');
import logger from 'morgan';
//var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
//var bodyParser = require('body-parser');
import bodyParser from 'body-parser';
//var httpProxy = require('http-proxy');
import httpProxy from 'http-proxy';
//var requestHandler = require('./requestHandler.js');
import requestHandler from './requestHandler.js';
var app = express();

app.use(logger('dev'));

//PROXY TO API
const apiProxy = httpProxy.createProxyServer({
  target:
    {
        host: 'localhost',
        port: 3001
    }
});
app.use('/api', function(req, res){
    apiProxy.web(req, res);
});
// END PROXY


app.use(express.static(path.join(__dirname, 'public')));

/*app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});*/

app.set('view engine', 'ejs');

app.use(requestHandler);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
