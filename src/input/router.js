require('dotenv').config()
const express = require('express')
const { v4: uuid } = require('uuid')
//const logger = require('../logger')
const { NODE_ENV } = require('../config')
const InputService = require('./service')
const app = express()

const inputRouter = express.Router()
const bodyParser = express.json()

inputRouter
    .route('/')
    // This is a post for the incident-- its inputs are outdated
    .post((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { 
            student_marss, staff_submitter, school, date, day_of_the_week, 
            start_time, end_time, duration, seclusion, resonable_force, 
            student_injury, staff_injury, law_enforcement, room_location, 
            holds_used, antecedent, contributing_variables, people_involved,
            major_disruption } = req.body;
        const newIncident = { 
            student_marss, staff_submitter, school, date, day_of_the_week, 
            start_time, end_time, duration, seclusion, resonable_force, 
            student_injury, staff_injury, law_enforcement, room_location, 
            holds_used, antecedent, contributing_variables, people_involved,
            major_disruption
         }

         //validating the content of the newIncident variables

         const id = uuid();

         InputService.addIncident(
             req.app.get('db'),
             newIncident
         )
         .then(incident => {
             res
             .status(201)
             .json(incident)
         })
        
    })

inputRouter
    // I need to distinguish between a post to add the final incident and one to add individual holds
    .route('/hold')
    // I need a post for a hold that returns the id and name of the hold_used
    // I dont know how to distinguish which table this is going to 
    .post((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { hold_type, start_time, stop_time, duration } = req.body;
        const newHold = { hold_type, start_time, stop_time, duration }
        const id = uuid();
        console.log('recieved');
        
        InputService.addHold(
            req.app.get('db'),
            newHold
        )
        .then(hold => {
            res
            .status(201)
            .json(hold.id)
        })
        .catch(next)
    })
    

inputRouter
    .route('/:id')
    // This will be the beginging framework for editing a specific entry that failed approval
    .get((res, req, next) => {
        const knexInstance = req.app.get('db')
        InputService.getById(knexInstance, req.params.id)
            .then(incident => {
                if(incident.approved){
                    return res.status(404).json({
                        error: {message: 'This incident has already been approved'}
                    })
                }
                if(!incident){
                    return res.status(404).json({
                        error: {message: 'Incident Not Found'}
                    })
                }
            })
    })
    // I need a get that will validate a students name and marrs numbers-- returns only ok if valid
    .patch((res, req, next) => {
        // updates anything that is different
    })

module.exports = inputRouter 