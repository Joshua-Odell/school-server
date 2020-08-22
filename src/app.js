require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const IncidentService = require('./incident-service')


const app = express()

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({extended: false})

const morganOption = ( NODE_ENV === 'production')
    ? 'tiny'
    : 'common' ;

app.use(morgan(morganOption))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.get('/incidentform', (req, res, next) => {
    const knexInstance = req.app.get('db')
    IncidentService.getAllIncidents(knexInstance)
        .then(incidents => {
            res.json(incidents)
        })
})

app.post('/incidentform', jsonParser, (req, res) => {
    console.log(req.body);
    res
    .send('Post Recieved');
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: {message: 'server error'} }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app