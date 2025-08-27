import express from "express";
import Product from "../models/product.js";
import { createProduct, deleteProduct, getProduct, getProductByID, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.get("/",getProduct);
productRouter.post("/",createProduct);
productRouter.get("/search",(req,res)=>{
    res.json({
        message:"Serarching!"
    })
});
productRouter.delete("/:productID",deleteProduct);
productRouter.put("/:productID",updateProduct);
productRouter.get("/:productID",getProductByID);


export default productRouter;