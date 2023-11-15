const mongoose = require("mongoose");

const User = require("../models/users");

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    trim: true,
    required: true,
  },

  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },

  imageUrl: {
    type: String,
  },

  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],

  quantityInStock: {
    type:Number,
    required:true
  }
});

module.exports = mongoose.model("Product", productSchema);
