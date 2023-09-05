const expense = require("express");
const router = expense.Router();

const premiumController = require("../controllers/premiumController");
const auth = require("../middlewares/auth");

router.get("/showLeaderboard",auth.authenticate, premiumController.showLeaderboard);

module.exports = router;