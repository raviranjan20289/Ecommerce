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

exports.addProduct = async (req, res)=>{
   try{
     const data = await Product.create(req.body);
     console.log(data);
     res.status(201).json({data});
    
   }catch(err){
    console.log(err);
   }
}

exports.getSigleProduct = async (req, res)=>{
    try{
        const id = req.params.id;
       const result = await Product.find({_id:id});
       res.status(200).json({result});

    }catch(err){
        console.log(err);
    }
}