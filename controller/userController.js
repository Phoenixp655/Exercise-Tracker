const express = require('express');
const exerciseSchema = require('../model/exerciseSchema');
const userSchema = require('../model/userSchema')


const createUser = async (req, res) => {
    const user = await userSchema.create({
        username: req.body.name
    })

    user.save((err, data) => {
        if(err) console.log(err);
        res.status(200).json({username: data.username, _id: data._id})
    })
}

const getAllUser = async (req, res) => {
    const getAll = await userSchema.find({},'username _id');

    res.status(200).send(getAll)
}


module.exports = {
    createUser,
    getAllUser
}