const express = require("express");

const router = express.Router();

const orderController = require("../controllers/order");

const userAuthentication = require("../middleware/auth");

router.post(
  "/orderPlace",
  userAuthentication.authorize,
  orderController.placeOrder
);

module.exports = router;
