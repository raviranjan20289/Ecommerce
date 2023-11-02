const express = require("express");

const router = express.Router();


const productController = require('../controllers/products');

router.get("/", productController.getAllProducts);

router.post("/add-product", productController.addProduct);

router.get("/singleProduct/:id", productController.getSigleProduct);
module.exports = router;

