import express from "express";
const router = express.Router();
import { productIndex, productDetails } from "../../controllers/productController.js";


router.get("/", productIndex);

router.get("/:id", productDetails);

export default router;
