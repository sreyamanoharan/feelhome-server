import BannerCollection from './../../Models/BannerModel.js'
import adminRoute from './../../Routes/AdminRoute.js'
import mongoose from 'mongoose'


export const addBanner= async (req,res)=>{
  try {
    const {mainHeading,description,bannerImage}=req.body
    const banner = new BannerCollection( {
        mainHeading,
        description,
        bannerImage,     
    })
    let banners=await banner.save()
    if(banners)res.status(200).json({banner})
    else res.status(500).json({error:'Internal Server Error'})
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal Server Error'})
  }
     
}

export const getBanner=async(req,res)=>{
    try {
        const bannerData=await BannerCollection.find()
        res.status(200).json({bannerData})

    } catch (error) {
        res.status(200).json({errmsg:'server down'})
        console.log('baneer error',error);
    }
}


export const disableBanner=async(req,res)=>{
    try {
        
        const {id}=req.query
        let disable
        const objectId = new mongoose.Types.ObjectId(id);
        let status=await BannerCollection.findOne({_id:objectId})
        if(status.bannerStatus==true){
            disable =false
            status.bannerStatus= false
        }else{
            disable =true
            status.bannerStatus= true
        }
        const update = await status.save()
        if(update) res.status(200).json({disable})
        else res.status(502).json({errmsg:'somthing went wrong'})
    } catch (error) {
        console.log(error)
        
    }
}

export const deleteBanner=async(req,res)=>{
try {
    
    const {id}=req.query
    console.log(id,'hiiiii');
    
    const bannerData=await BannerCollection.findByIdAndDelete(id)
    console.log(bannerData);
    res.status(200).json({bannerData})
    
} catch (error) {
    
}
}

