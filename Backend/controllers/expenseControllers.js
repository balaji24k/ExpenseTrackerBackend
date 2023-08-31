const Expenses = require("../models/Expenses");

exports.postData = (req, res, next) => {
  Expenses.create(req.body)
    .then((result) => {
        res.status(201).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    });
};

exports.getData = (req, res, next) => {
  Expenses.findAll()
  .then(data => {
    res.status(200).json(data);
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

exports.deleteData = (req, res, next) => {
  // console.log("delete id",req.params.id)
  Expenses.findByPk(req.params.id)
    .then(result => {
      result.destroy();
    }).catch((err) => {
        res.json(err);
    });
};

exports.updateData = (req, res, next) => {
  console.log("update id",req.params.id);
	console.log("update body",req.body);
  Expenses.findByPk(req.params.id)
    .then(result => {
	    result.expense = req.body.expense;
      result.category = req.body.category;
      result.price = req.body.price;
      // console.log("ressult>>>>>>>>", result);
      return result.save();
    })
    .then(data => {
      console.log("data>>>>>>>>>>>>>>>>>>>>",data)
      res.status(200).json(data);
    })
    // .catch(err => {
    //   console.log("err>>>>>>>>>>>>>>>>>>>>",err)
		//   res.status(500).json(err);
	  // });
};
