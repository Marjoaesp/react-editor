"use strict";
exports.__esModule = true;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var port = 5173;
app.use(bodyParser.json());
app.use(cors());
var receivedWord = '';
app.post('/Info', function (req, res) {
    var word = req.body.word;
    if (word) {
        receivedWord = word;
        res.status(200).json({ message: 'Word received successfully', word: word });
    }
    else {
        res.status(400).json({ message: 'No word received' });
    }
});
app.get('/Info', function (req, res) {
    res.status(200).json({ word: receivedWord });
});
app.listen(port, function () {
    console.log("Server running on http://localhost:".concat(port));
});
