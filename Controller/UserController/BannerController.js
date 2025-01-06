import BannerCollection from '../../Models/BannerModel.js'


export const getBanner=async(req,res)=>{
    try {        
        const banners=await BannerCollection.find({bannerStatus:true})
        res.status(200).json({banners})

    } catch (error) {
        res.status(200).json({errmsg:'server down'})
        console.log('baneer error',error);
    }
}
