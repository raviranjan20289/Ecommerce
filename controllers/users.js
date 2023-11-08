const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.send("user already exists");
    }

    const registerUser = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    registerUser.password = await bcrypt.hash(registerUser.password, salt);
    await registerUser.save();
    res.status(201).json({ registerUser });
  } catch (err) {
    console.log(err);
  }
};

exports.signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const token = jwt.sign(
    { userId: user._id, email: email },
    "process.env.Secret_Key",
    { expiresIn: "1hr" }
  );
  console.log(token);

  if (user) {
    return res.status(200).send(token);
  } else {
    res.status(400).send("Incorrect Credentials");
  }
};
