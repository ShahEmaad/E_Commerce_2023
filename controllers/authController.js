import colors from 'colors';
import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import JWT from 'jsonwebtoken';
import { hash } from 'bcrypt';

//POST REGISTER
export const registerController = async(req,res) => {
    try {
        const {name,email,password,phone,address,answer} = req.body;
        //Validations
        if(!name){
            return res.send({message : 'Name is Required'});
        }
        if(!email){
            return res.send({message : 'Email is Required'});
        }
        if(!password){
            return res.send({message : 'Password is Required'});
        }
        if(!phone){
            return res.send({message : 'Phone no is Required'});
        }
        if(!address){
            return res.send({message : 'Address is Required'});
        }
        if(!answer){
            return res.send({message : 'Answer is Required'});
        }
        //Check User
        const existingUser = await userModel.findOne({email : email});
        //Existing User
        if(existingUser){
            return res.status(200).send({
                success : false,
                message : "Already Registered Please Login"
            })
        }
        //Regidter User
        const hashedPassword = await hashPassword(password);
        const hashedAnswer = await hashPassword(answer);
        //Save
        const user = await new userModel({name,email,password : hashedPassword,phone,address,answer: hashedAnswer}).save();
        
        res.send({
            success : true,
            message : "Successfully Registered User",
            user
        })

    } catch (error) {
        console.log(`${error}`.bgRed.white);
        res.status(500).send({
            success : false,
            message : 'Error in Registration',
            error
        })
    }
};

//POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body;
        //Validate
        if(!email || !password){
            res.status(404).send({
                success : false,
                message : 'Invalid user or password',
            })
        }
        //Check User
        const user = await userModel.findOne({email : email});
        if(!user){
            return res.status(404).send({
                success : false,
                message : 'Invalid email'
            })
        }
        //Compare Password
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success : false,
                message : 'Invalid password',
            })
        }
        //Token
        const token = await JWT.sign({_id : user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.status(200).send({
            success : true,
            message : 'Login Successfull',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                
                role : user.role,
            },
            token,
        })
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        res.status(500).send({
            success : false,
            message : 'Error in Login',
            error
        })
    }
};

//FORGOT PASSWORD CONTROLLER
export const forgotPasswordController = async(req,res) => {
    try {
        const {email,answer,newPassword} = req.body;

        if(!email){
            res.status(500).send({message:"Email is Required"});
        }
        if(!answer){
            res.status(500).send({message:"Answer is Required"});
        }
        if(!newPassword){
            res.status(500).send({message:"New password is Required"});
        }
        //Check user
        const user = await userModel.findOne({email: email});
        //Validate
        if(!user){
            return res.status(404).send({
                success : false,
                message : "Invalid Email"
            })
        }
        //Compare answer
        const match = await comparePassword(answer,user.answer);
        if(!match){
            return res.status(200).send({
                success : false,
                message : 'Invalid Answer',
            })
        }
        
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id,{password : hashed});

        res.status(200).send({
            success : true,
            message : "Password Reset Successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Something went wrong!',
            error
        })
    }
};

//TEST CONTRLLER
export const testController = (req,res) => {
    res.send("Protected Route");
}; 