require('dotenv').config()
const express = require('express')
const { v4: uuid } = require('uuid')
const logger = require('../logger')
const { list } = require('../store')
const { NODE_ENV } = require('../config')
const InputService = require('./service')
const app = express()

const inputRouter = express.Router()
const bodyParser = express.json()

inputRouter
    .route('/')
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

         //validating th epresenced of the newIncident variables

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
    .route('/:id')
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
    .patch((res, req, next) => {
        // updates anything that is different
    })
