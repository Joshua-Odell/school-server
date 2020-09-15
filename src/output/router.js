require('dotenv').config();
const express = require('express');
const { v4: uuid } = require('uuid');
//const logger = require('../logger');
const { NODE_ENV } = require('../config');
const OutputService = require('./service');
const { updateIncident } = require('./service');
const returnEmail = require('../email');
const dataReturn = require('../dataReturn');
const app = express();

const outputRouter = express.Router();
const bodyParser = express.json();

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
            .catch(next)
    })
    .patch((req, res, next) => {
        const knexInstance = req.app.get('db')
        const updatedIncident = { ... req.body }
        if(!typeof(updatedIncident.approved) || (!updatedIncident.approved && !updatedIncident.approver_comments)){
            return (
                res
                .status(404)
                .json('Invalid Request')
            )
        }
        if(!updateIncident.approved){
            //returnEmail(req.params.id);
        }
        OutputService.updateIncident(knexInstance, req.params.id, updatedIncident)
            .then(() => {
                return (
                    res.status(200)
                    .json('incident updated')
                )
            })
            .catch(next)
        if(updatedIncident.approved){
            OutputService.getWhole(knexInstance)
            .then(data => {dataReturn(data);});
            
        }
    });


module.exports = outputRouter