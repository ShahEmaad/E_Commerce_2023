import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { 
        createProductController,
        updateProductController,
        getSingleProductController ,
        getProductController,
        productPhotoController,
        deleteProductController,
        productFiltersController,
        productCountController,
        productListController,
        searchProductController,
        realtedProductController,
        productCategoryController,
        braintreeTokenController,
        brainTreePaymentController,
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

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;