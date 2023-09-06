const Expenses = require("../models/Expenses");
const User = require("../models/Users");

exports.postData = async(req, res, next) => {
  try {
    const totalSpent = Number(req.user.totalSpent) + Number(req.body.price);
    const promise1 = User.update({totalSpent : totalSpent},{where : {id: req.user.id}})
    const promise2 = req.user.createExpense(req.body);

    const result = await Promise.all([promise1,promise2]);
    res.status(200).json(result[1]);
  } catch (error) {
    res.status(500).json(err);
  }
};

exports.getData = async(req, res, next) => {
  try {
    const expenses = await req.user.getExpenses();
    res.status(200).json({expenses,user:req.user});
  } catch (error) {
    res.status(500).json(err);
  }
};

exports.deleteData = async(req, res, next) => {
  try {
    const expense = await req.user.getExpenses({where: {id: req.params.id}});
    // console.log("del exp>>>>>",expense)
    console.log("delete>>","total:",req.user.totalSpent,"exp:",expense[0].dataValues.price);
    const totalSpent = Number(req.user.totalSpent) - Number(expense[0].dataValues.price);
    const promise1 = User.update({totalSpent : totalSpent},{where : {id: req.user.id}})
    const promise2 = Expenses.destroy({where: {id: req.params.id}})
  
    const result = await Promise.all([promise1,promise2]);
    res.status(204).json(result);
  } catch (error) {
    console.log("errr>>>>",error)
    res.status(404).json({err:error})
  }
};

exports.updateData = async(req, res, next) => {
  console.log("update user",req.user.totalSpent);
	console.log("update body",req.body);
  try {
    const totalSpent = Number(req.user.totalSpent) - (Number(req.body.prevExpensePrice)-Number(req.body.price));
    const promise1 = Expenses.update({price : req.body.price},{where : {id: req.params.id}})
    const promise2 = User.update({totalSpent : totalSpent},{where : {id: req.user.id}})
    
    await Promise.all([promise1,promise2])
    console.log("update result",req.body);
    res.status(200).json(req.body);
  } catch (err) {
    // console.log("err in update",error)
    res.status(500).json(err)
  }

};



  // Expenses.destroy({where: {id: req.params.id, userId: deletingUserId}})
  //   .then(numOfRows => {
  //     console.log("mum of rows delete",numOfRows);
  //     if(numOfRows === 0) {
  //       return res.status(404).json({success:false, message : "Expense does not belongs to user!"})
  //     }
  //     return res.status(200).json({success:true, message : "Deleted Successfully"});
  //   })
  //   .catch(err => {
  //     res.status(500).json({success:false, message : "Failed!"});
  //   })

  // Expenses.findByPk(req.params.id)
  //   .then(result => {
  //     result.destroy();
  //   }).catch((err) => {
  //       res.json(err);
  //   });
