const express = require('express');
const exerciseSchema = require('../model/exerciseSchema');
const userSchema = require('../model/userSchema')

//@ create user
const createUser = async (req, res) => {
    const user = await userSchema.create({
        username: req.body.username
    })

    user.save((err, data) => {
        if(err) console.log(err);
        res.status(200).json({username: data.username, _id: data._id})
    })
}


//@ get all user
const getAllUser = async (req, res) => {
    const getAll = await userSchema.find({});

    res.status(200).send(getAll)
}

const createUserExercise = async (req, res) => {
    //@ assign reqest body data to bodyData
    const bodyData = req.body;
    const userId = req.params.id;
    const date = !bodyData ? new Date(Date.now()).toDateString() : /[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/g.test(bodyData.date) ? new Date(bodyData.date).toDateString() : new Date(Date.now()).toDateString();
    //@ create exercise schema
    const createExercise = await exerciseSchema.create({
        desciption: bodyData.desciption,
        duration: bodyData.duration,
        date: date,
        users: userId
    })

    //@ get user with id
    const getUser = await userSchema.findOne({_id: userId},'_id username');


    //@ create exercise and send user info combine currrent create exercise
    createExercise.save((err, data) => {
        if(err) console.log(err);
        const userExercise = Object.assign({_id: getUser._id, username: getUser.username},{date: data.date, duration: data.duration,desciption: data.desciption});
        res.json(userExercise)
    })

    
}

module.exports = {
    createUser,
    getAllUser,
    createUserExercise
}