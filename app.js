var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var prices = require('db-prices');
var moment = require('moment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/sparpreise/:fromID/:toID', async function (req, res, next) {
    var fromID = req.params.fromID;
    var toID = req.params.toID;

    var result = await prices(fromID, toID, null);

    res.status(200).send({
        success: 'true',
        message: result
    });
});

app.get('/sparpreise/:fromID/:toID/:when', async function (req, res, next) {
    var fromID = req.params.fromID;
    var toID = req.params.toID;
    var when = req.params.when;

    var moment_when = moment(when);

    var result = await prices(fromID, toID, moment_when.toDate());

    res.status(200).send({
        success: 'true',
        message: result
    });
});

module.exports = app;
