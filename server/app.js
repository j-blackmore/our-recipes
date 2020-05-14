require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const router = require('./controllers/router');

const ENV = process.env.ENV || 'DEV';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(router);

// TODO: Close mongoDB connection somehow

if (ENV === 'PROD') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;
