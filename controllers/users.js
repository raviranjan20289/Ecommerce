const User = require('../models/users');

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
  console.log(user);
  if (user) {
      console.log("hii");
      res.status(200).send("Login successful");
  } else {
      res.status(401).send("Invalid Credentials");
  }
}