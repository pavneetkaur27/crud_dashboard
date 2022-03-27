const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const httpResponse = require('../helper').HttpResponse;
const sendError = httpResponse.sendError;
const sendSuccess = httpResponse.sendSuccess;

router.get('/', function (req, res, next) {
    console.log('test');
    res.send('working');
});

module.exports = router;
