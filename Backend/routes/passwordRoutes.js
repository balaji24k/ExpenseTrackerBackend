const expense = require("express");
const router = expense.Router();

const passwordController = require("../controllers/passwordController");

router.post("/forgotPassword", passwordController.forgotPassword);

module.exports = router;