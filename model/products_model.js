import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    inStock:{
        type:Boolean,
        default:true,
        required:true
    },
     
});

export const Product = mongoose.model("product",productSchema);