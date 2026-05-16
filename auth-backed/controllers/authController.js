const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register user

exports.registerUser = async (req , res)=>{
    try {
        const {name,email,password} =req.body;

        const userExists = await User.findOne({email});

        if (userExists){
            return res.status(400).json({
                error:"User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = new User({
            name,
            email,
            password :hashedPassword ,
        });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
        
    }
}


//Login

exports.loginUser = async (req,res)=>{
    try {
        const {email, password}= req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                error:"invalid credentials",
            });
        }

        const isMatch =await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                error:"invalid credentials",
            });
            
        }

        //token 

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });

        
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

