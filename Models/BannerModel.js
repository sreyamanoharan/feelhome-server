import mongoose from 'mongoose';

const BannerSchema=new mongoose.Schema({
  mainHeading:{
        type:String,
        required:true
      },
      description:{
        type:String,
        required:true
      },
      bannerImage:{
        type:String,
        required:true
      },
      bannerStatus:{
        type:Boolean,
        default:true
      }
})

const Banner = mongoose.model('Banner',BannerSchema);

export default Banner