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
    // This is a post for the incident
    .post((req, res, next) => {
        const knexInstance = req.app.get('db')
        const { 
            student_marss, staff_submitter, school, date, day_of_the_week, 
            seclusion, resonable_force, student_injury, staff_injury, 
            law_enforcement, room_location, hold_1, hold_2, hold_3, hold_4, hold_5,
            antecedent, contributing_variables, people_involved, major_disruption 
        } = req.body;
        const newIncident = { 
            student_marss, staff_submitter, school, date, day_of_the_week, 
            seclusion, resonable_force, student_injury, staff_injury, 
            law_enforcement, room_location, hold_1, hold_2, hold_3, hold_4, hold_5,
            antecedent, contributing_variables, people_involved, major_disruption 
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
        .catch(next)
    })
    
inputRouter
    .route('/studentcheck/:marss/:student_last_name')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        InputService.getStudentVerification(knexInstance, req.params.marss, req.params.student_last_name)
            .then(student => {
                res
                .status(200)
                .json('Students Presence Confirmed')
            })
            .catch(next)
    })

inputRouter
    .route('/involvedstudentcheck/:student_first_name/:student_last_name')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        InputService.getInvolvedStudentVerification(knexInstance, req.params.student_first_name, req.params.student_last_name)
        .then(student => {
            res
            .status(200)
            .json('Students Presence Confirmed')
        })
        .catch(next)
    })

inputRouter
    .route('/staffcheck/:staff_name')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        InputService.getStaffVerification(knexInstance, req.params.staff_name)
            .then(staff => {
                res
                .status(200)
                .json(staff[0].email)
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