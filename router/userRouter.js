const express = require('express');
const router = express.Router();
const {createUser, getAllUser, createUserExercise} = require('../controller/userController') 


router.route('/')
.get((req, res) => getAllUser(req, res))
.post((req, res) => {
    createUser(req, res)
})

router.post('/:id/exercises', (req, res) => {
    createUserExercise(req, res)
})

module.exports = router;