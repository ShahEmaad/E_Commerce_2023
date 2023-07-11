import colors from 'colors';
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protect the Routes based on Tokens
export const requireSignIn = async (req,res,next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
          );
        req.user = decode;
        next();
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        return res.status(404).send({
            success : false,
            message : 'Error in SignIn MiddleWare',
            error
        });
    }
};

//Admin Access
export const isAdmin = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(404).send({
                success : false,
                message : 'Unauthorised Access'
            });
        }
        else{
            next();
        }
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        res.send({
            success : false,
            message : 'Error in Admin MiddleWare',
            error
        })
    }
};