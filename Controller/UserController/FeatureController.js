import featureCollection from '../../Models/FeatureModel.js'


export const getFeature=async(req,res)=>{
    try {
        console.log('hereeeeeeeeeeee cattttt');
        const feature=await featureCollection.find()
        res.status(200).json({feature})
    } catch (error) {
        console.log(error);
    }
}