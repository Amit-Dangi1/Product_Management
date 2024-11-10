import express from "express";
import { allProduct, deleteProduct, oneProduct, productCreate, updateProduct } from "../controller/product_controller.js";
import { auth } from "../middelware/Auth.js";

let router = express.Router();

router.post("/create",productCreate);
router.get("/:id",oneProduct);
router.get("/",allProduct);
router.delete("/:id",deleteProduct);
router.put("/:id",updateProduct);

export default router;