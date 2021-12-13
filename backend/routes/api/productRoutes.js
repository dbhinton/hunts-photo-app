import express from "express";
const router = express.Router();
import { productIndex, productDetail } from "../../controllers/productController.js";


router.get("/", productIndex);

router.get("/:id", productDetail);

export default router;
