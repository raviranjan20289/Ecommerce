const Product = require('../models/product.model');

exports.getAllProducts = async (req, res)=>{
  try{
   const result = await Product.find();
   console.log(result);
   res.status(200).json({result});
    
  }catch(err){
    console.log(err);
  }
}

exports.addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const imageUrl = req.file.path;
    
    const data = await Product.create({ name, price, quantity, imageUrl });
    console.log(data);
    res.status(201).json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getSigleProduct = async (req, res)=>{
    try{
        const id = req.params.id;
       const result = await Product.find({_id:id});
       res.status(200).json({result});

    }catch(err){
        console.log(err);
    }
}