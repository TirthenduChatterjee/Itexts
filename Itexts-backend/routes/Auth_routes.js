const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middlewares/fetchuser');
// Route:1 for creating new user
router.post('/create', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password of minimum length 5').isLength({ min: 5 })],
    async (req, res) => {
        const error = validationResult(req);
        let success=false
        if (!error.isEmpty()) {
            return res.status(400).json({success:success, message: error.array() });
        }
        try {
            const checkuser = await User.findOne({ email: req.body.email });
            if (checkuser) {
                return res.status(400).json({success:success, message: "Email already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secpass = bcrypt.hashSync(req.body.password, salt);
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secpass
            })
            // res.json(user)
            // const data = {
            //     user: {
            //         id: user.id
            //     }
            // };
            // const jwtdata = jwt.sign(data,process.env.JWT_TOKEN);
            // res.json(data);
            success=true
            res.json({success:success});
        } catch (error) {
            success=false
            return res.status(500).send("Some error occured");
        }
    })
    // Route: 2 for user login

    router.post('/login',[
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a password of minimum length 5').isLength({ min: 5 })],
    async (req,res)=>{
        let success=false
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({success:success, error: error.array() });
        }
        const {email,password}=req.body;
        try{
            const user = await User.findOne({ email: email });
            if(!user){
                return res.status(400).json({success:success,message:"Login Failed , Try To Login With Correct Credentials"});
            }
            const checkpassword= bcrypt.compareSync(password,user.password);
            if(!checkpassword){
                return res.status(400).json({success:success,message:"Login Failed , Try To Login With Correct Credentials"});
            }
            const data = {
                user: {
                    id: user.id
                }
            };
            const jwtdata = jwt.sign(data,process.env.JWT_TOKEN);
            success=true
            res.json({success:success,token:jwtdata});
        } catch(err){
            success=false
            return res.status(500).json({success:success,message:"Some error occured"});
        }
    }
    )
    //Route: 3 for fetching user from jwt token
    router.post('/getuser',fetchuser,async (req,res)=>{
        try {
            id = req.user.id;
            const user = await User.findById(id).select("-password");
            res.send(user);
        } catch (error) {
            return res.status(500).send("Some error occured") ;
        }
    })
module.exports = router;