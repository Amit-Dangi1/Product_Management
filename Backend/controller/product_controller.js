import { Product } from "../model/products_model.js";

export const productCreate = async (req,res,next) => {
    try {

        let{name,price,category,inStock} = req.body;
           inStock = Boolean(inStock)             
                        console.log("inStock = ",inStock);


        let product = await Product.insertOne({name,price,category,inStock});
        
        if(!product)
            return res.status(403).json({message:"Product not Create"})
            return res.status(201).json({message:"Product Created"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
};

export const oneProduct = async (req,res,next) => {
    try {
        let{id} = req.params;
        if(!id)
            return res.status(404).json({message:"Please provide ID"});
        let isProduct = await Product.findOne({_id:id});
        if(!isProduct)
            return res.status(404).json({message:"No Product Found"})
            return res.status(201).json({isProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
};

export const allProduct = async (req,res,next) => {
    try {
        let product = await Product.find();
        return res.status(201).json({product});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
};

export const deleteProduct = async (req,res,next) => {
    try {
        let{id} = req.params;
        if(!id)
            return res.status(404).json({message:"Please provide ID"});
        let isProduct = await Product.findOne({_id:id});
        if(!isProduct)
            return res.status(404).json({message:"No Product Found"});
        let isDelete = await Product.deleteOne({_id:id});
        if(isDelete.deletedCount==0)
            return res.json({message:"No Product Delete"});
            return res.status(201).json({message:"Product Deleted"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
};

export const updateProduct = async (req,res,next) => {
    try {
        let{id} = req.params;
        if(!id)
            return res.status(404).json({message:"Please provide ID"});
        let{name,price,category,inStock} = req.body;
        let isProduct = await Product.findOne({_id:id});
        if(!isProduct)
            return res.status(404).json({message:"No Product Found"})
           let isUpdate = await Product.updateOne({_id:id},{$set:{name,price,category,inStock}});
           if(isUpdate.modifiedCount==0)
            return res.json({message:"Product not Update"})
            return res.status(201).json({message:"Product Updated"})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
}