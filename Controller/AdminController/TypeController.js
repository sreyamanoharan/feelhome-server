import typeSchema from '../../Models/TypeModel.js'


export const addType= async (req,res)=>{
    try {
        const {heading,typeImage}=req.body
        console.log(req.body);
        const type= new typeSchema({
            heading,
            typeImage
        })
        let types= await type.save()
        if(types) res.status(200).json({type})
        else res.status(500).json({error:'server error'})
    } catch (error) {
        console.log(error);
    }
}

export const getType= async(req,res)=>{
    try {
        const type=await typeSchema.find()
        res.status(200).json({type})
    } catch (error) {
        res.status(200).json({errmsg:'server error'})
    }
}