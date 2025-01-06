import typeSchema from '../../Models/TypeModel.js'


export const getType= async(req,res)=>{
    try {
        console.log('getFeatureeeeee');
        const type=await typeSchema.find()
        res.status(200).json({type})
    } catch (error) {
        res.status(200).json({errmsg:'server error'})
    }
}
