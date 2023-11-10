const Product = require("../models/product.model");
const User = require("../models/users");

exports.getAllProducts = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const imageUrl = req.file.path;

    const data = await Product.create({ name, price, quantity, imageUrl });
    console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};
exports.getSigleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.find({ _id: id });
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
  }
};

exports.rateProduct = async (req, res) => {
  try {
    const { userId, productId, ratings } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Add each rating in the array to the product's ratings
    ratings.forEach((ratingItem) => {
      const existingRatingIndex = product.ratings.findIndex(
        (r) => r.userId.toString() === ratingItem.userId
      );

      if (existingRatingIndex !== -1) {
        // If the user has already rated, update their rating
        product.ratings[existingRatingIndex].rating = ratingItem.rating;
      } else {
        // If the user has not rated, add their rating
        product.ratings.push({
          userId: ratingItem.userId,
          rating: ratingItem.rating,
        });
      }
    });

    await product.save();

    res.status(200).json({ message: "Product rating updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.filterProducts = async (req, res)=>{
  try{
  
    const { minPrice, maxPrice, minRatings } = req.query;

    const filter = {};
    if (minPrice) filter.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseFloat(maxPrice) };
    if (minRatings) filter['ratings.rating'] = { $gte: parseInt(minRatings) };

    const products = await Product.find(filter);
    res.status(200).res.json(products);
     

  }catch(err){
    console.error("Error is: ", err);
    res.status(500).send("Server Error");
  }
}