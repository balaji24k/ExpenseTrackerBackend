const expense = require("express");

const router = expense.Router();

const userControllers = require("../controllers/userController");

router.post("/signup", userControllers.signup);

module.exports = router;