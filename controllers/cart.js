const Cart = require("../models/cart.model");

exports.postCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    if (!userId) {
      res.status(401).send("unauthorized requrest");
    }
    const result = await Cart.create({ productId, userId, quantity });

    res.status(201).json({ result });
  } catch (err) {
    console.error("Error while creating Cart:", err);
    res.status(500).send("Server Error");
  }
};

exports.getCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).send("unauthorized request");
    }
    const result = await Cart.find({ userId });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).send("server Error");
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    const filter = { userId, productId };
    const update = { quantity };
    const options = { new: true };
    const updateCartItem = await Cart.findOneAndUpdate(filter, update, options);
    if (!updateCartItem) {
      res.status(404).json({ message: "cart item not found" });
    }
    res.status(200).json({ message: "Cart Updated Successfully" });
  } catch (err) {
    console.error("while updating cart item: ", err);
    res.status(500).send("Server Error");
  }
};

exports.deleteCartItem = async (req, res) => {
  try {
    const userId = req.userId;
    const cartId = req.params.id;
    const findItem = await Cart.findOne({ userId, _id: cartId });
    if (!findItem) {
      res.status(404).json({ mssg: "Bad request" });
    }
    const deleteItem = await Cart.deleteOne({ _id: cartId });
    res.status(200).json({ mssg: deleteItem });
  } catch (err) {
    console.error("Error is :", err);
    res.status(500).json({ mssg: "Server Error" });
  }
};
