const express = require('express');
const router = express.Router();
const {createUser, getAllUser} = require('../controller/userController') 


router.route('/')
.get((req, res) => getAllUser(req, res))
.post((req, res) => {
    createUser(req, res)
})



module.exports = router;