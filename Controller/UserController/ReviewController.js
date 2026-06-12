import reviewSchema from "../../Models/ReviewModel.js";
import Host from "../../Models/HostModel.js";
import { model } from "mongoose";

export const postReview = async (req, res) => {
    try {
        const { userId, propertyId, review, rating } = req.body
        const reviews = new reviewSchema({
            userId,
            propertyId,
            review,
            rating
        })

        let Review = await reviews.save()
        res.status(200).json({ review: Review })
    } catch (error) {
        console.log(error);

    }

}

export const getReviews = async (req, res) => {
    try {
        const id = req.params.id
        const reviews = await reviewSchema.find({ propertyId: id }).populate({ path: 'propertyId', populate: { path: 'hostId', model: 'User' } }).populate('userId')
        const rating = reviews.map((review) => {

            return review.rating
        })

        const propRev = reviews.map((rev) => (

            {
                review: rev.review, reviewer: rev.userId.name, date: rev.createdAt.toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            }
        ))

        let lengths = rating.length

        let avg = rating?.reduce((a, b) => {
            return a + b
        })

        const avgRating = (avg / lengths).toFixed(1)
        res.status(200).json({ review: propRev, rating: avgRating })
    } catch (error) {
        console.log(error);

    }

}