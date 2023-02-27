const express = require('express');
const router = express.Router();
const {createUser, getAllUser, createUserExercise, getAllUserExercises} = require('../controller/userController') 

//@ userController
router.route('/')
.get((req, res) => getAllUser(req, res))
.post((req, res) => {
    createUser(req, res)
})

router.post('/:id/exercises', (req, res) => {
    //@ validate date format or if it is empty date
    /[0-9]{4,}(\/|\-)(0[1-9]|1[012])(\/|\-)(0[1-9]|1[0-9]|2[0-9]|3[01])/g.test(req.body.date) || !req.body.date
    ? createUserExercise(req, res) 
    : res.json({error: "Invalid date format"})
})

router.get('/:id/logs', (req, res) => {
    getAllUserExercises(req, res)
})

module.exports = router;