import mongoose from 'mongoose'

const TypeSchema = new mongoose.Schema({
    heading:{
    type:String,
    required:true
    },
    typeImage:{
        type:String,
        required:true
    },
    typeStatus:{
        type:Boolean,
        default:true
    }
})


const Type= mongoose.model('type',TypeSchema)

export default Type