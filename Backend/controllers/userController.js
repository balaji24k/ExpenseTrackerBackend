const Users = require("../models/Users");

const isValidString = (string) => {
  if (string == null || string.length === 0) {
    return true;
  } else {
    return false;
  }
};

exports.signup = async (req, res) => {
  console.log("body>>>>>>>>>>>>>>>", req.body);
  const { name, email, password } = req.body;

  try {
    if (isValidString(name) || isValidString(email) || isValidString(password)){
      return res.json({success:false, error: "invaild inputs, please enter valid details" });
    }

    // Check if the email already exists in the database
    const existingUser = await Users.findAll({ where: { email: email } });
    // console.log("existingUser>>>>>>>>>", existingUser);
    if (existingUser.length > 0) {
      return res.json({ success: false, error: "Email already exists" });
    }

    // If email doesn't exist, create a new user
    const newUser = await Users.create(req.body);
    res.json({ success: true, message: "User created", user: newUser });
  } catch (error) {
    res.json({ success: false, error: "Server error" });
  }
};
