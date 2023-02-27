const express = require('express');
const exerciseSchema = require('../model/exerciseSchema');
const userSchema = require('../model/userSchema');
const asyncHandler = require('express-async-handler')

//@ userRouter
//@ POST method
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

//@ userRouter
//@ GET method
//@ get all user
const getAllUser = asyncHandler(async (req, res) => {
    const getAll = await userSchema.find({});

    res.status(200).send(getAll)
})

//@ userRouter
//@ POST method
//@ create user exercise and res user with exercise recent added 
const createUserExercise = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    const reqParams = req.params.id;

    //@ if date field empty use system date or check regex date string if valid then create date from it
    const date = !reqBody.date 
    ? new Date(Date.now()).toLocaleDateString().split('/').reverse().join('-') 
    : /[0-9]{4}(\/|\-)[0-9]{1,2}(\/|\-)[0-9]{1,2}/g.test(reqBody.date) 
        ? reqBody.date
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
                date: new Date(data.date).toDateString(),
                _id: getUser._id
            })
    })
})

//@ userRouter
//@ GET method
const getAllUserExercises = asyncHandler(async (req, res) => {
    const reqParams =  req.params.id;
    const {from: fromDate, to: toDate, limit: limitLog} = req.query;
    console.log(req.query)
  
    let getUser = await userSchema.findById(reqParams,'username');
  
await exerciseSchema.find({date : {$lte: new Date(toDate).toDateString(), $gte: new Date(fromDate).toDateString()}}).limit(limitLog||0).exec((err, data) => {
        console.log(data)
    })
    //@ query find exercise with exact id of user and res user with their exercise logs  
    await exerciseSchema.find({}, 'description duration date -_id').where('users').equals(reqParams).exec((err, data) => {
        if(err) console.log(data);
        let logs = data.map(e => e.date = new Date(e.date).toDateString());
        res.status(200).json({_id : reqParams, username : getUser.username, count : data.length, log: logs})
    })
})

module.exports = {
    createUser,
    getAllUser,
    createUserExercise,
    getAllUserExercises
}