import reviewSchema from "../../Models/ReviewModel.js";
import Host from "../../Models/HostModel.js";
import { model } from "mongoose";

export const postReview=async(req,res)=>{
 try {
    const {userId,propertyId,review, rating}=req.body
    const reviews= new reviewSchema({
        userId,
        propertyId,
        review,
        rating
    })

    let Review=await reviews.save()
    console.log(Review,'wowww');
    
    res.status(200).json({review:Review})
 } catch (error) {
    console.log(error);
    
 }
    
}

export const getReviews=async(req,res)=>{
    try {
        const id=req.params.id
        console.log(id,'id undeeeeeeee');
        
        const reviews=await reviewSchema.find({propertyId:id}).populate({path:'propertyId',populate:{path:'hostId',model:'User'}}).populate('userId')
        // console.log(reviews,'hiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        
        const rating=reviews.map((review)=>{
                   
            return review.rating
    })

    const propRev=reviews.map((rev)=>(
        
       {review:rev.review,reviewer:rev.userId.name,date:rev.createdAt.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",})}
    ))

    console.log(propRev,'oooooooooooooooooooooooooooo');
    
    let lengths=rating.length

    let avg=rating?.reduce((a,b)=>{
        return a+b
    })

    const avgRating=(avg/lengths).toFixed(1)
        console.log(propRev,avgRating,'hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
        
        // console.log(reviews,'gettingg itttt...');
        res.status(200).json({review:propRev,rating:avgRating})
    } catch (error) {
        console.log(error);
        
    }
  
}