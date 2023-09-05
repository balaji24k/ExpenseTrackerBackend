const User = require("../models/Users");
const Expense = require("../models/Expenses");

exports.showLeaderboard = async(req, res, next) => {
	// console.log(">>>>>>>>>>>>>>>>in showLeaderboard");
	try {
		const users = await User.findAll();
		const expenses = await Expense.findAll();
		// console.log("expenses>>>>>>>>>>", expenses[0].dataValues);
		const totalExpenseByUser = {};
		expenses.forEach(expense => {
			// console.log("inside forEch>>>>>>>",expense.dataValues)
			let userId = expense.dataValues.userId;
			if (totalExpenseByUser[userId]) {
				totalExpenseByUser[userId] += expense.dataValues.price
			}
			else{
				totalExpenseByUser[userId] = expense.dataValues.price;
			}
		});
		console.log("totalExpenseByUser>>>>>>>",totalExpenseByUser);

		const leaderboardData = []
		users.forEach(user => {
			console.log("user foreach",user.dataValues);
			leaderboardData.push({
				name: user.dataValues.name,
				spent: totalExpenseByUser[user.dataValues.id] || 0
			})
		})
		leaderboardData.sort((a,b)=> b.spent - a.spent)
		res.status(200).json(leaderboardData);
	} catch (error) {
		res.status(404).json(err);
	}
};
