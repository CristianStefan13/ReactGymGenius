const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const productsRoute = require("./routes/products");
const subscriptionsRoute = require("./routes/subscriptions");
const users = require("./routes/users");
const orders = require("./routes/orders");

const products = require("./products");

const subscriptions = require("./subscriptions");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRoute);
app.use("/api/subscriptions", subscriptionsRoute);
app.use("/api/users", users);
app.use("/api/orders", orders);

app.get("/", (req, res) => {
  res.send("Welcome to our online shop API ");
});

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/subscriptions", (req, res) => {
  res.send(subscriptions);
});

const port = process.env.PORT || 5000;
const uri = process.env.DB_URL;

app.listen(port, () => console.log(`Server running on ${port}`));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection succesfully"))
  .catch((err) => console.log("MongoDb connection failed", err.message));
