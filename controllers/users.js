const User = require('../models/users');
const jwt = require('jsonwebtoken');
exports.signUp = async (req, res)=>{
  try{
    const {name, email, password} = req.body;
    const newuser = await User.create({name, email, password});
    res.status(201).json({newuser});

  }catch(err){
    console.log(err);
  }
};


exports.signIn = async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email: email, password: password });
  const token = jwt.sign({ userId:user._id, email: email}, 'process.env.Secret_Key', {expiresIn:'1hr'});
  console.log(token);
  
  if (user) {
      res.status(200).send(token);
  } else {
      res.status(400).send("Incorrect Credentials");
  }
}