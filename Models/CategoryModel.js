import mongoose from 'mongoose'

const CategorySchema= new mongoose.Schema({
      heading:{
        type:String,
        required:true
      },
      categoryImage:{
        type:String,
        required:true
      },
      categoryStatus:{
        type:Boolean,
        default:true
      }

})

const Category= mongoose.model('category',CategorySchema)

export default Category