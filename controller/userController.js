const express = require('express');
const exerciseSchema = require('../model/exerciseSchema');
const userSchema = require('../model/userSchema');
const asyncHandler = require('express-async-handler')


//@ create user
const createUser = asyncHandler(async (req, res) => {
    const user = await userSchema.create({
        username: req.body.username
    })

    user.save((err, data) => {
        if(err) console.log(err);
        res.status(200).json({username: data.username, _id: data._id})
    })
})


//@ get all user
const getAllUser = asyncHandler(async (req, res) => {
    const getAll = await userSchema.find({});

    res.status(200).send(getAll)
})

//@ create user exercise and res user with exercise recent added 
const createUserExercise = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    const reqParams = req.params.id;

    //@ if date field empty use system date or check regex date string if valid then create date frome it
    const date = !reqBody.date 
    ? new Date(Date.now()).toDateString() 
    : /[0-9]{4}(\/|\-)[0-9]{1,2}(\/|\-)[0-9]{1,2}/g.test(reqBody.date) 
        ? new Date(reqBody.date).toDateString() 
        : res.json({error: 'Invalid date format'});

    const creaExercise = await exerciseSchema.create({
        description: reqBody.description,
        duration: reqBody.duration,
        date: date,
        users: reqParams
    });


    let getUser = await userSchema.findById(reqParams,'username');

    creaExercise.save((err, data) => {
        if(err) console.log(err);

            res.status(200).json({
                username: getUser.username, 
                description: data.description,
                duration: data.duration,
                date: data.date,
                _id: getUser._id
            })
    })
})

const getAllUserExercises = asyncHandler(async (req, res) => {
    const reqParams =  req.params.id;
    let getUser = await userSchema.findById(reqParams,'username')
    let getExercises = await exerciseSchema.find({}, 'description duration date -_id').where('users').equals(reqParams).exec((err, data) => {
        if(err) console.log(data);
        res.status(200).json({_id : reqParams, username : getUser.username, count : data.length, data})
    })
})

module.exports = {
    createUser,
    getAllUser,
    createUserExercise,
    getAllUserExercises
}