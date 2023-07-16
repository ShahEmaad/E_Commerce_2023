import categoryModel from '../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async (req,res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({
                message : "Name is required",
            })
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success : false,
                message : "Caregory Already Exists",
            })
        }

        const category = await new categoryModel({name,slug : slugify(name)}).save();
        res.status(201).send({
            success : true,
            message : "New Caregory Created",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error in Category",
            error,
        })
    }
};

//Update Catigory
export const updateCategoryController = async (req,res) =>{
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug : slugify(name)},{new : true});
        res.status(200).send({
            success : true,
            message : "Category Update Successfull",
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error while updating Category",
            error,
        })
    }
};

//Get All Catigoryes
export const categoryController = async (req,res) =>{
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success : true,
            message : "All Categoryes List",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error while Getting Category",
            error,
        }) 
    }
}

// Get Single Catigory
export const singleCategoryController = async (req,res) => {
    try { 
        const category = await categoryModel.findOne({slug : req.params.slug });
        res.status(200).send({
            success : true,
            message : "Category Successfully Found",
            category,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error while Getting Category",
            error,
        })
    }
};

//Delete Catigory
export const deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success : true,
            message : "Category Deleted Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : "Error while Deleting Category",
            error,
        })
    }
};