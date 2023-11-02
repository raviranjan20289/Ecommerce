const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();


const productController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: "./uploads",
          
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  

router.get("/", productController.getAllProducts);

router.post("/add-product", upload.single('imageUrl'), productController.addProduct);

router.get("/singleProduct/:id", productController.getSigleProduct);
module.exports = router;

