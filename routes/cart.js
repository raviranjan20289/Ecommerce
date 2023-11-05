const express = require("express");

const router = express.Router();

const cartController = require("../controllers/cart");

const userAuthentication = require("../middleware/auth");

router.post(
  "/cartItems",
  userAuthentication.authorize,
  cartController.postCart
);

router.get(
  "/getCartItem",
  userAuthentication.authorize,
  cartController.getCartItem
);

router.patch(
  "/updateCartItem",
  userAuthentication.authorize,
  cartController.updateCart
);

router.delete(
  "/deleteCartItem/:id",
  userAuthentication.authorize,
  cartController.deleteCartItem
);
module.exports = router;
