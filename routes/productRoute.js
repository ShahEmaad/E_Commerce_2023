import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
        createProductController,
        updateProductController,
        getSingleProductController ,
        getProductController,
        productPhotoController,
        deleteProductController
        } from "../controllers/productController.js";

import formidable from 'express-formidable';

const router = express.Router();

//Routes

//Create Product
router.post('/create-product' ,requireSignIn ,isAdmin ,formidable() ,createProductController );

//Update Product
router.put('/update-product/:pid' ,requireSignIn ,isAdmin ,formidable() ,updateProductController );

//Get Product
router.get('/get-product' ,getProductController );

//Single Product
router.get('/get-product/:slug' ,getSingleProductController );

//Get Photo
router.get('/product-photo/:pid' ,productPhotoController );

//Delete Product
router.delete('/delete-product/:pid' ,requireSignIn ,isAdmin ,deleteProductController );

export default router;