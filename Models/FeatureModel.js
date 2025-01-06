import mongoose from 'mongoose'

const FeatureSchema = new mongoose.Schema({
    heading:{
    type:String,
    required:true
    },
    featureImage:{
        type:String,
        required:true
    },
    featureStatus:{
        type:Boolean,
        default:true
    }
})


const Feature= mongoose.model('feature',FeatureSchema)

export default Feature