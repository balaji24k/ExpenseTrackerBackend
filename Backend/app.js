const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const sequelize = require("./util/database");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const premiumRoutes = require("./routes/premiumRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

const Expenses = require("./models/Expenses");
const Users = require("./models/Users");
const Order = require("./models/Orders");
const ForgotPassword = require("./models/ForgotPassword");
const DownloadList = require('./models/DownloadList');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user",userRoutes);
app.use("/expenses",expenseRoutes);
app.use("/purchase",purchaseRoutes);
app.use("/premium", premiumRoutes);
app.use("/password",passwordRoutes);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Order);
Order.belongsTo(Users);

Users.hasMany(ForgotPassword);
ForgotPassword.belongsTo(Users);

Users.hasMany(DownloadList);
DownloadList.belongsTo(Users);

sequelize.sync()
    .then(result => {
        app.listen(4000)
    })
    .catch(err => {
        console.log(err)
    })
