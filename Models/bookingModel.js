import mongoose from 'mongoose'

const bookingSchema=new mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
},
propertyId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
},
checkOutDate:{
     type:Date,
     required:true
},
checkInDate:{
    type:Date,
    required:true
},
amount:{
    type:Number
},
bookedAt:{
    type:Date,
    required:true
},
commissionAmount:{
    type:Number
},
hostAmount:{
    type:Number
},
guests:{
    type:Number
},
idProof:{
    type:String
}

})

const Booking=mongoose.model('booking',bookingSchema)

export default Booking