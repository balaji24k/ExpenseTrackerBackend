const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.authenticate = (req, res, next) => {
	console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>in Auth")
	try {
		const token = req.header("Authorization");
		// console.log("token>>>>>>>>>>>", token);
		const user = jwt.verify(token,"asdfgh");
		// console.log("userId>>>>>>>>>>>", user.userId);
		User.findByPk(user.userId)
			.then(user => {
				req.user = user;
				next();	
			})
			.catch(err => {
				throw new Error(err)
			})
	}
	catch(err) {
		console.log(err);
		return res.status(401).json({success : false, message:"user does not exists"})
	}
}