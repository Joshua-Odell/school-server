require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {CLIENT_ORIGIN} = require('./config');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const IncidentService = require('./input/service');
const inputRouter = require('./input/router');
const outputRouter = require('./output/router');


const app = express();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

const morganOption = ( NODE_ENV === 'production')
    ? 'tiny'
    : 'common' ;

app.use(morgan(morganOption));
app.use(express.json());
app.use(helmet());
app.use(cors({origin: CLIENT_ORIGIN}));
app.use(inputRouter);
app.use(outputRouter);

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: {message: 'server error'} }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
});

module.exports = app