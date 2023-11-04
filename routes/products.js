
const express = require("express");
const multer = require('multer');
const path = require('path');
const router = express.Router();


const productController = require('../controllers/products');

const userAuthentication = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: "./uploads",
          
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });
  

router.get("/", userAuthentication.authorize, productController.getAllProducts);

router.post("/add-product", upload.single('imageUrl'), productController.addProduct);

router.get("/singleProduct/:id", userAuthentication.authorize, productController.getSigleProduct);

router.post("/rate", userAuthentication.authorize, productController.rateProduct);

module.exports = router;

