import express from "express";
import {
  createNewProduct,
  getAllProducts,
  deleteProduct,
  updateProduct
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createNewProduct);
router.get("/", getAllProducts);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
