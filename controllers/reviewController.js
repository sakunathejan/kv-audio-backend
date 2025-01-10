import Review from "../models/review.js";

export function addReview(req, res) {
    if(req.user == null){
        res.status(401).json({message:"Please login and try again"})
        return
    }
    
    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;

    const newReview = new Review(data);

    newReview.save().then(() => {
        res.json({message:"Review added successfully"})
    }).catch(() => {
        res.status(500).json({error:"Review addition failed"})
    });   


}


export function getReviews(req, res) {

    let user = req.user;

    if(user == null || user.role != "admin")
    {
        Review.find({isApproved:true}).then((reviews) => {
            res.json(reviews);
        }).catch((error) => {
            res.status(500).json({error:"Review addition failed"})
        })
    
        return
    }
    
    if(user.role == "admin")
    {
        Review.find().then((reviews)=>{
            res.json(reviews);
        })
    }

}

//delete review
export function deleteReview(req, res) {
    //getting email from the url
    const email = req.params.email;

    //checking if the user is null
    if(req.user == null){
        res.status(401).json({message:"Please login and try again"})
        return
    }

    //checking if the user is admin and admin should be able to delete any review
    if(req.user.role == "admin"){
        Review.deleteOne({email : email}).then(() => {
            res.json({message:"Review deleted successfully"})
        }).catch(() => {
            res.status(500).json({error:"Review deletion failed"})
        })
        return
    }

    //checking if the user is customer and customer should be able to delete only their review only
    if(req.user.role == "customer"){
        
        if(req.user.email == email){
            Review.deleteOne({email : email}).then(() => {
                res.json({message:"Review deleted successfully"})
            }).catch(() => {
                res.status(500).json({error:"Review deletion failed"})
            });
        }
    }
    else{
        res.status(401).json({message:"You are not authorized to delete this review"})
    }
            
            
}

export function approveReview(req ,res){
    const email = req.params.email;

    //checking if the user is null
    if(req.user == null){
        res.status(401).json({message:"Please login and try again"})
        return
    }

    //checking if the user is admin and admin should be able to approve any review
    //update function
    if(req.user.role == "admin"){
        Review.updateOne({email:email},{isApproved:true}).then(()=>{
            res.json({message:"Review approved successfully"})
        }).catch(()=>{
            res.status(500).json({error:"Review approval failed"})
        });
    }
    else{
        res.status(401).json({message:"You are not an admin to approve this review only admin can approve the review"})
    }
}

   