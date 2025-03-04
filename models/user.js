import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  //testing
  role : {
    type : String,
    required : true,
    default : "customer"  
  },
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  address : {
    type : String,
    required : true
  },
  phone : {
    type : String,
    required : true
  },
  profilePicture : {
    type : String,
    required : true,
    default : "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
  },
  
});

const User= mongoose.model("User",userSchema);

export default User;



