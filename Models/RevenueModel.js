import mongoose from 'mongoose'

const revenueSchema=new mongoose.Schema({
    rentId:{
        type:String
    },
    AdminAmount:{
        type:Number
    },
    HostAmount:{
        type:Number
    },
    date:{
        type:Date
    }
})


const revenue = mongoose.model('Revenue', revenueSchema);

export default revenue;