import mongoose from 'mongoose'

const reviewSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Host'
    },
    review:{
       type:String
    },
    rating:{
     type:Number,
    

    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
)

const review= mongoose.model('Review', reviewSchema)

export default review