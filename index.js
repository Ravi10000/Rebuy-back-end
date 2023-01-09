// dotenv config
process.env.NODE_ENV !== "production" && require("dotenv").config();

// packages
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const bodyParser = require("body-parser");

// inbuild packages
const path = require("path");

// routes
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");

// models
const User = require("./models/user.model");

// express app initialization
const app = express();

// environment variables
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/cashify-clone";
const PORT = process.env.PORT || 5000;

// show mongooselogs only in development mode
// process.env.NODE_ENV !== "production" && mongoose.set("debug", true);

// mongoose connection
mongoose.connect(DB_URL);
const DB = mongoose.connection;
DB.on("error", console.error.bind(console, "connection error: "));
DB.once("open", () => {
  console.log("connected to mongodb");
});

const store = new MongoDBStore({
  uri: DB_URL,
  collection: "sessions",
});

const sessionConfig = {
  secret: "This is a secret",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true,
};

// middlewares
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// route management
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// serve react files only in production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening for requests on PORT ${PORT}`);
});
