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
    createUserExercise(req, res)
})

router.get('/:id/logs', (req, res) => {
    getAllUserExercises(req, res)
})

module.exports = router;