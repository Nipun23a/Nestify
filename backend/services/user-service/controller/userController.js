const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const {json} = require("express");

// Register User
const registerUser = async (req, res) => {
    try {
        const {first_name, last_name, email , password, type,contact_number,profile_image} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).send({error: 'User already exist'});
        }
        const newUser = new User({
            first_name,last_name,email,password,type,contact_number,profile_image,
        });
        await newUser.save();

        res.status(201).json({message: 'User registered successfully'});
    }catch (error){
        res.status(500).json({message:error.message});
    }
};

// Login User
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User Not Found'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid Credential'});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({token});
    }catch (error){
        res.status(500).json({message: error.message});
    }
}

module.exports = {registerUser,loginUser};

