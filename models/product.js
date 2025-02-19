import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key:{
    type:String,
    required:true,
    unique:true
  },
  name : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  catergoy:{
    type:String,
    required:true,
    default:"Uncategorized"
  },
  dimensions:{
    type: String,
    required:true
  },
  description : {
    type : String,
    required : true
  },
  availability:{
    type:String,
    required : true,
    default:true
  },
  image:{
    type : [String],
    required : true,
    default:["https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fillustration%2Fprofile-icon.html&psig=AOvVaw07NitRnQsiV7nu13NHlxXn&ust=1739711892445000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPCtsYHixYsDFQAAAAAdAAAAABAE"]
    
  }
});

const Product = mongoose.model("Product",productSchema);

export default Product;