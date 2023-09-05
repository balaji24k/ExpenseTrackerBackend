const Expenses = require("../models/Expenses");

exports.postData = (req, res, next) => {
  console.log("in PostDatalatest>>>>>>>>>>>",req.user);
  console.log("body in post", req.body)
  const newExpense = {...req.body, userId: req.user.id};
  // Expenses.create(newExpense)
  req.user.createExpense(req.body)
    .then((result) => {
        console.log("result>>>>>>>>>>",result)
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
};

exports.getData = (req, res, next) => {
  // console.log("in getDatalatest>>>>>>>>>>>",req.user);
  // Expenses.findAll({where : {userId : req.user.id}})
  req.user.getExpenses()
  .then(expenses => {
    res.status(200).json({expenses,user:req.user});
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

exports.deleteData = (req, res, next) => {
  console.log("delete id",req.params.id)
  console.log("delete user id",req.user.dataValues.id);
  const deletingUserId = req.user.dataValues.id;

  Expenses.destroy({where: {id: req.params.id, userId: deletingUserId}})
    .then(numOfRows => {
      if(numOfRows === 0) {
        return res.status(404).json({success:false, message : "Expense does not belongs to user!"})
      }
      return res.status(200).json({success:true, message : "Deleted Successfully"});
    })
    .catch(err => {
      res.status(500).json({success:false, message : "Failed!"});
    })

  // Expenses.findByPk(req.params.id)
  //   .then(result => {
  //     result.destroy();
  //   }).catch((err) => {
  //       res.json(err);
  //   });
};

exports.updateData = (req, res, next) => {
  console.log("update id",req.params.id);
	console.log("update body",req.body);
  const updatingUserId = req.user.dataValues.id;
  Expenses.findAll({where: {id: req.params.id, userId: updatingUserId }})
    .then(results => {
      // console.log("results>>>>>>>",results[0].expense)
      const result = results[0];
	    result.expense = req.body.expense;
      result.category = req.body.category;
      result.price = req.body.price;
      // console.log("ressult>>>>>>>>", result);
      return results[0].save();
    })
    .then(data => {
      console.log("data>>>>>>>>>>>>>>>>>>>>",data)
      res.status(200).json(data);
    })
    .catch(err => {
      console.log("err>>>>>>>>>>>>>>>>>>>>",err)
		  res.status(500).json(err);
	  });
};
