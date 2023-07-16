import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController ,
         createCategoryController ,
         updateCategoryController ,
         singleCategoryController ,
         deleteCategoryController
        } from '../controllers/categoryController.js';

const router = express.Router();

//Routes
//Create Catigory
router.post('/create-category' ,requireSignIn ,isAdmin , createCategoryController );

//Update Catigory
router.put('/update-category/:id' ,requireSignIn ,isAdmin , updateCategoryController );

//Get All Catigories
router.get('/get-category' , categoryController );

//Single Catigories
router.get('/single-category/:slug' , singleCategoryController );

//Delete Catigory
router.delete('/delete-category/:id' ,requireSignIn ,isAdmin , deleteCategoryController );

export default router;