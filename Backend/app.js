const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const sequelize = require("./util/database");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const Expenses = require("./models/Expenses");
const Users = require("./models/Users");

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use("/user",userRoutes);
app.use("/expenses",expenseRoutes);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

sequelize.sync()
    .then(result => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })
