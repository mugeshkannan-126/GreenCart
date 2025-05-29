


// Register User /api/user/register
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const registerUser = async (req , res)=> {
    try {
        const {name , email , password} = req.body;

        if(!name || !email || !password) {
            return res.json({success:false , message:'Missing Details'})
        }

        const existingUser = await User.findOne({email});

        if(existingUser) return res.json({response:false , message:'User already exists'});

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({name , email , password:hashedPassword});

        const token = jwt.sign({id:user._id} , process.env.JWT_SECRET , {expiresIn : '1d'});

        res.cookie('token' , token , {
            httpOnly:true,  // Prevent JS from accessing the cookie
            secure: process.env.NODE_ENV === 'production' , // Use Secure cookies in production,
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge : 24 * 60 * 60 * 1000 , // Cookie expiration time (1 Day)
        })

        return res.json({success:true , user : {email : user.email , name : user.name}})

    } catch (error) {
        console.log(error.message)
        res.json({success:false , message:error.message})
    }
}

    // Login User : /api/user/login
export const login = async(req , res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password) {
            return res.json({success: false, message: "Email and Password are required"});
        }

        const existingUser = await User.findOne({email});

        if(!existingUser) {
            return res.json({success: false , message : "Invalid Email or Password"});
        }

        const isMatch = await bcrypt.compare(password , existingUser.password);

        if(!isMatch) {
            return res.json({success:false , message : "Invalid Email or Password"});
        }

        const token = jwt.sign({id: existingUser._id} , process.env.JWT_SECRET , {expiresIn : '1d'});

        res.cookie('token' , token , {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production' ,
            sameSite : process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 24 * 60 * 60 * 1000 ,
        })

        return res.json({success:true , user : {email : existingUser.email , name : existingUser.name}})

    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message});
    }
}

// Check Auth : /api/user/is-auth
// export const isAuth = async(req , res) => {
//     try {
//         const userId = req.userId;
//         const user = await User.findById(userId).select("-password");
//         return res.json({success:true , user})
//     } catch (error) {
//         console.log(error.message);
//         res.json({success:false , message:error.message});
//     }
// }

export const isAuth = async(req , res) => {
    try {
        const userId = req.user._id;  // <-- Fix here, use req.user._id
        const user = await User.findById(userId).select("-password");
        return res.json({success:true , user});
    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message});
    }
}


// Logout User : /api/user/logout
export const logout = async(req , res) => {
    try {
        res.clearCookie('token' , {
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production' ,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success:true , message:"Logged out successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false , message:error.message});
    }
}