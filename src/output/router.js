require('dotenv').config()
const express = require('express')
const { v4: uuid } = require('uuid')
//const logger = require('../logger')
const { NODE_ENV } = require('../config')
const OutputService = require('./service')
const app = express()

const outputRouter = express.Router()
const bodyParser = express.json()

outputRouter
    .route('/conformationpage/:id')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        OutputService.getById(knexInstance, req.params.id)
            .then(incident => {
                if(!incident){
                    return res.status(404).json({
                        error: {message: 'Incident Not Found'}
                    })
                }
                if(incident.approved){
                    return res.status(404).json({
                        error: {message: 'This incident was already approved'}
                    })
                }else {
                    res
                        .status(200)
                        .json(incident)
                }
            })
    })


module.exports = outputRouter