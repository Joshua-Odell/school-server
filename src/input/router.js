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
        const newIncident = { ...req.body }

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
        if(!req.params.marss || !req.params.student_last_name){
            return res.status(404);
        }
        InputService.getStudentVerification(knexInstance, req.params.marss, req.params.student_last_name)
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
        if(!req.params.staff_name){
            return res.status(404);
        }
        InputService.getStaffVerification(knexInstance, req.params.staff_name)
            .then(staff => {
                console.log(staff)
                if(!staff[0]){
                    res
                    .status(404)
                    .json('Not a valid Staff member')
                }
                res
                .status(200)
                .json(staff[0])
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

module.exports = inputRouter 