import featureCollection from './../../Models/FeatureModel.js'
import mongoose from 'mongoose'

export const addFeature= async (req,res)=>{
    try {
        const {heading,featureImage}=req.body
        const feature= new featureCollection({
            heading,
            featureImage
        })
        let features= await feature.save()
        if(features) res.status(200).json({feature})
        else res.status(500).json({error:'server error'})
    } catch (error) {
        console.log(error);
    }
}

export const getFeature= async(req,res)=>{
    try {
        
        const feature=await featureCollection.find()
        res.status(200).json({feature})
    } catch (error) {
        res.status(200).json({errmsg:'server error'})
    }
}