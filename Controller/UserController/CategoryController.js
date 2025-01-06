import CategorySchema from '../../Models/CategoryModel.js'


export const getCategory=async(req,res)=>{
    try {

        const category=await CategorySchema.find()
        res.status(200).json({category})
    } catch (error) {
        console.log(error);
    }
}