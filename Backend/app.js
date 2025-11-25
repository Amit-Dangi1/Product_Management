import express from "express"
import mongoose from "mongoose"
import cors from "cors";
import bodyParser from "body-parser";
import UserRouter from "./routes/user_routes.js"
import ProductRouter from "./routes/product_routes.js"
import cookieParser from "cookie-parser";


let app = express();

mongoose.connect("mongodb+srv://amitjidangi:amit123@maincluster.k9eypml.mongodb.net/vkaps2?retryWrites=true&w=majority&appName=MainCluster")
.then(result=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
        app.use(cors({
            origin:"http://localhost:5173",
   credentials: true                 
}))
    app.use(cookieParser())

    app.use("/user",UserRouter);
    app.use("/product",ProductRouter);

    app.listen(3000,()=>{
        console.log("Server Started...");
        
    })
}).catch(err=>{
    console.log(err);
    console.log("Database Connection Failed");
    
})