const User = require("../models/Users");
const Expense = require("../models/Expenses");
const sequelize = require("../util/database");

exports.showLeaderboard = async(req, res, next) => {
	// console.log(">>>>>>>>>>>>>>>>in showLeaderboard");
	try {
		const expenses = await User.findAll({
			attributes : ['id', 'name', [sequelize.fn('sum',sequelize.col('expenses.price')),'spent']],
			include : [
				{
					model : Expense,
					attributes: []
				},
			],
			group: ['user.id'],
			order : [['spent',"DESC"]]
		});
		// const expenses = await Expense.findAll({
		// 	attributes : ['userId', [sequelize.fn('sum',sequelize.col('expenses.price')),'spent']],
		// 	group : ['userId']
		// });
		console.log("expenses>>>>>>>>>>", expenses[1]);
		res.status(200).json(expenses);
		// const totalExpenseByUser = {};
		// expenses.forEach(expense => {
		// 	// console.log("inside forEch>>>>>>>",expense.dataValues)
		// 	let userId = expense.dataValues.userId;
		// 	if (totalExpenseByUser[userId]) {
		// 		totalExpenseByUser[userId] += expense.dataValues.price
		// 	}
		// 	else{
		// 		totalExpenseByUser[userId] = expense.dataValues.price;
		// 	}
		// });
		// // console.log("totalExpenseByUser>>>>>>>",totalExpenseByUser);

		// const leaderboardData = []
		// users.forEach(user => {
		// 	// console.log("user foreach",user.dataValues);
		// 	leaderboardData.push({
		// 		name: user.dataValues.name,
		// 		spent: totalExpenseByUser[user.dataValues.id] || 0
		// 	})
		// })
		// leaderboardData.sort((a,b)=> b.spent - a.spent)
	} catch (error) {
		res.status(404).json(error);
	}
};
