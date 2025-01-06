import CategorySchema from './../../Models/CategoryModel.js'
import adminRoute from '../../Routes/AdminRoute.js'
import mongoose from 'mongoose'


export const addCategory=async (req,res)=>{
    try {
        const {heading,categoryImage}=req.body

        const category=new CategorySchema({
            heading,
            categoryImage
        })
        let categories= await category.save()
        if(categories) res.status(200).json({category})
        else res.status(500).json({error:'internal server error'})
    } catch (error) {
        console.log(error);
    }
}

export const getCategory=async(req,res)=>{
    try {
      
        const category=await CategorySchema.find()

        res.status(200).json({category})
    } catch (error) {
        res.status(200).json({errmsg:'server down'})
    }
}