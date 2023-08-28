const Users = require("../models/Users");
const bcrypt = require("bcrypt");

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
    console.log(password,"line 29>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      console.log(err,"inside hash>>>>>>>>>>>>>>>>>>>");
      Users.create({name, email, password: hash});
      res.json({ success: true, message: "User created"});
    })

  } catch (error) {
    res.json({ success: false, error: "Server error" });
  }
};

exports.login = async(req, res, next) => {
  const { email, password } = req.body;
  try {
    if (isValidString(email) || isValidString(password)){
      return res.json({success:false, error: "invaild inputs, please enter valid details"});
    }
    const user = await Users.findAll({ where: { email } });
    // console.log("user>>>>>>>>>>>",user[0].dataValues.password)
    if(user.length > 0) {
      const hashPassword = user[0].dataValues.password;
      bcrypt.compare(password, hashPassword, (err, result) => {
        if(err) {
          return res.json({success:false, error: "something went wrong!"})
        }
        if (result) {
          return res.json({ success: true, message: "Succesfully Loggedin", user: user});
        }
        else {
          return res.json({success:false, error: "incorrect password!"})
        }
      }) 
      
    }
    else {
      return res.json({success:false, error: "user does not exist, create account"})
    }
  }
  catch(err) {
    res.json({ success: false, error: "Server error" });
  }
}
