import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: { 
        type: String, 
        required: true 
    },
    rating: {
        type: Number,
        required: true
    },
    comment: { 
        type: String, 
        required: true 
    },
    time: { 
        type: Date, 
        required: true ,
        default: Date.now()
    },
    rating: { 
        type: Number, 
        required: true 
    },
    isApproved: { 
        type: Boolean, 
        required: true, 
        default: false 
    },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;