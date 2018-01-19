"use strict"
//var setUpConnection = require('./utils/utils.js');
import setUpConnection from './utils/utils.js';
//var express = require('express');
import express from 'express';
//var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
//var bodyParser = require('body-parser');
import bodyParser from 'body-parser';
//var session = require('express-session');
import session from 'express-session';
//var MongoStore = require('connect-mongo')(session);
import connectMongo from 'connect-mongo';
var MongoStore = connectMongo(session);
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
var Books = require('./models/books.js');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
setUpConnection(app.get('env'));

// --->> SETUP SESSION<<---
app.use(session({
    secret: 'mySecretSessionWord',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000*60*60*24*2},
    store: new MongoStore({mongooseConnection: db, ttl: 60*60*24*2})
}))
// --->>END SETUP SESSION<<---

// --->>GET TO SESSION<<---
app.get('/cart', function(req, res){
    if('undefined' !== typeof req.session.cart){
        res.json(req.session.cart);
    }else{
        throw new Error('cart session not found');
    }
});
// --->>END GET TO SESSION<<---

// --->>SAVE TO SESSION<<---
app.post('/cart', function(req, res){
    var cart = req.body;
    req.session.cart = cart;
    req.session.save(function(err){
        if(err){
            throw err;
        }
        res.json(req.session.cart);
    });
});
// --->>END SAVE TO SESSION<<---

// --->>GET BOOKS IMAGES API<<---
app.get('/images', function(req, res){
    const imgFolder = __dirname + '/public/images/';

    const fs = require('fs');
    fs.readdir(imgFolder, function(err, files){
        if(err){
            throw err;
        }
        const filesArr = [];
        files.map(function(file){
            filesArr.push({name: file});
        });
        res.json(filesArr);
    });
});

// --->>END GET BOOKS IMAGES API<<---

// --->>GET BOOKS<<---
app.get('/books', function(req, res){
    var books = req.body;
    Books.find(function(err, books){
        if(err){
            throw err;
        }
        res.json(books);
    });
});

// --->>POST BOOKS<<---
app.post('/books', function(req, res){
    var book = req.body;
    Books.create(book, function(err, books){
        if(err){
            /*throw err;*/
            console.log('# API Book posting ERROR - ', err);
        }
        res.json(books);
    });
});

// --->>UPDATE BOOKS<<---
app.put('/books/:_id', function(req, res){
    var query = {_id: req.params._id};
    var book = req.body;
    var update = {
        '$set': {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price
        }
    };
    var options = {new: true};
    Books.findOneAndUpdate(query, update, options, function(err, books){
        if(err){
            /*throw err;*/
            console.log('# API Book updating ERROR - ', err);
        }
        res.json(books);
    });
});

// --->>DELETE BOOKS<<---
app.delete('/books/:_id', function(req, res){
    var query = {_id: req.params._id};
    Books.remove(query, function(err, books){
        if(err){
            /*throw err;*/
            console.log('# API Book deleting ERROR - ', err);
        }
        res.json(books);
    });
});

// END APIs

app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});