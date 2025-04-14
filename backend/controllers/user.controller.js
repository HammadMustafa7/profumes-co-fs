import userModel from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"})
}

//Route for user Registration
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //Check if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: "User already exists"});
        }

        // Validating email format & strong password
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if(password.length < 8){
            return res.json({success: false, message: "Password must be at least 8 characters long"});
        }

        //Hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, 
            email, 
            password: hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id)

        return res.status(201).json({
            success: true, 
            message: "User registered successfully", 
            token
        })


    } catch (error) {
        console.log("Error: " , error)
        return res.status(500).json({
            success: false, 
            message: "Internal server error",
        })
        
    }
}

//Route for user login
const loginUser = async (req, res) => {
try {
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.json({success: false, message: "User not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch){
        const token = createToken(user._id)
        res.status(200).json({success: true, token})
    }else{
        res.json({success: false, message: "Invalid credentials"})
    }
} catch (error) {
    console.log("Error: " , error)
        return res.status(500).json({
            success: false, 
            message: "Internal server error",
        })
}
}


//Route for admin login
const adminLogin = async (req, res) => {
try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password , process.env.JWT_SECRET)
        res.status(200).json({success: true, token})
    }else{
        res.json({success: false, message: "Invalid credentials"})  
    }
} catch (error) {
    console.log("Error: " , error)
        return res.status(500).json({
            success: false, 
            message: "Internal server error",
        })
}
}

export {
    loginUser,
    registerUser,
    adminLogin
}