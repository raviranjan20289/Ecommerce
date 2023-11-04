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
  const token = jwt.sign({ email: email}, 'process.env.Secret_Key');
  console.log(token)
  if (user) {
      res.status(200).send(token);
  } else {
      res.status(401).send("Invalid Credentials");
  }
}