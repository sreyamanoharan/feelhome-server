import mongoose from 'mongoose'

const rentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Host',
        required:true
    },
    checkInDate:{
        type:Date
    },
    checkOutDate:{
        type:Date
    },
    Amount:{
        type:Number
    },
    bookedAt:{
        type:Date
    },
    
  

})

const rent = mongoose.model('Rent', rentSchema);

export default rent;