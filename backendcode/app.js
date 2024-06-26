const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const sequelize = require("./util/database");
const expenseDetails = require("./routes/addexpense");
const signupDetails = require("./routes/signupORlogin");
const loginDetails = require("./routes/signupORlogin");
const purchasePremium = require("./routes/purchase-membership");
const premium_leaderBoard = require("./routes/premium");

const User = require("./models/signup");
const Expense = require("./models/define");
const Order = require("./models/order");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(expenseDetails);
app.use(signupDetails);
app.use(loginDetails);
app.use(purchasePremium);

app.use(premium_leaderBoard);

//create an association rules:
//it is one to many relationship because
//one user can add multiple expenses but expenses belongs to one particular user only
//In Sequelize, defining the association rules between models also sets up the foreign key relationships automatically.
User.hasMany(Expense);
Expense.belongsTo(User);

//Relationship between User and Order table:
//it is one to many relationship because
//one user can make multiple orders but multiple oders can belongs to one user only
//eg: i will make an order of pizza, so i will get my orderId(99) whenever pizza gets ready servant will call me
//this orderId will not going to get others its an unique orderId
User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(3000, () => {
      console.log("server running on 3000 port");
    });
  })
  .catch((error) => {
    console.log("error while connecting to database", error);
  });
