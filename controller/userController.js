const express = require('express');
const exerciseSchema = require('../model/exerciseSchema');
const userSchema = require('../model/userSchema')

//@ create user
const createUser = async (req, res) => {
    const user = await userSchema.create({
        username: req.body.name
    })

    user.save((err, data) => {
        if(err) console.log(err);
        res.status(200).json({username: data.username, _id: data._id})
    })
}


//@ get all user
const getAllUser = async (req, res) => {
    const getAll = await userSchema.find({},'username _id');

    res.status(200).send(getAll)
}

const createUserExercise = async (req, res) => {
    //@ assign reqest body data to bodyData
    const bodyData = req.body;

    const date = !bodyData ? new Date(Date.now()).toDateString() : /[0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}/g.test(bodyData.date) ? new Date(bodyData.date).toDateString() : new Date(Date.now()).toDateString();
    //@ create exercise schema
    const createExercise = await exerciseSchema.create({
        desciption: bodyData.desciption,
        duration: bodyData.duration,
        date: date,
        users: bodyData._id
    })

    //@ get user with id
    const getUser = await userSchema.findOne({_id: bodyData._id},'_id username');


    //@ create exercise and send user info combine currrent create exercise
    createExercise.save((err, data) => {
        if(err) console.log(err);
        const userExercise = Object.assign({desciption: data.desciption, duration: data.duration, date: data.date}, getUser._doc);
        res.json(userExercise)
    })

    
}

module.exports = {
    createUser,
    getAllUser,
    createUserExercise
}