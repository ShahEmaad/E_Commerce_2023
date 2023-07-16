import express from "express";
import {registerController,
        loginController,
        forgotPasswordController,
        testController,
    } from "../controllers/authController.js";
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";

//Router object
const router = express.Router();

//routing
//Register|| METHOD POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController);

//Forgot Password || POST
router.post('/forgot-password', forgotPasswordController);

//Test
router.get('/test',requireSignIn, isAdmin,testController);

//Protected User Route auth || GET
router.get('/user-auth',requireSignIn ,(req,res)=>{
    res.status(200).send({ ok: true});
});

//Protected Admin Route auth|| GET
router.get('/admin-auth',requireSignIn ,isAdmin ,(req,res)=>{
    res.status(200).send({ ok: true});
});

export default router;