const mongoose = require("mongoose");
const Cart = require("../models/cart.model");

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    // const cart = await Cart.find({ $and: [{ userId }, { quantity: 2 }] });
    const cart = await Cart.find({ userId });
    if (!cart.length) {
      res.status(401).send("unauthorized user");
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
      // {
      //   $group: {
      //     _id: null,
      //     total: { $sum: '$totalPrice' },
      //   },
      // },
    ]);
    const total = cartAggregation.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );

    console.log("result of total :", total);
    res.status(200).json({ total });
  } catch (err) {
    console.error("there is an error occured: ", err);
    res.status(500).send("Server Error");
  }
};
