const express = require('express');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User = mongoose.model('user',userSchema);

module.exports=User;