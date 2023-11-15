const mongoose = require("mongoose");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.userId;

    const cart = await Cart.find({ userId }).session(session);
    if (!cart.length) {
      res.status(401).send("Unauthorized user");
      return;
    }

    const cartAggregation = await Cart.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $addFields: {
          totalPrice: { $multiply: ["$productInfo.price", "$quantity"] },
        },
      },
    ]).session(session);

    const total = cartAggregation.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    const order = new Order({
      userId: userId,
      items: cartAggregation.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      total: total,
    });

    await order.save({ session });

    for (const item of cart) {
      const product = await Product.findById(item.productId).session(session);

      if (product.quantityInStock < item.quantity) {
        await session.abortTransaction();
        res.status(400).json({ error: "Insufficient stock for one or more products" });
        return;
      }

      product.quantityInStock -= item.quantity;
      await product.save({ session });

      await Cart.findByIdAndDelete(item._id).session(session);
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    await session.abortTransaction();
    console.error("There is an error occurred: ", err);
    res.status(500).send("Server Error");
  }
};