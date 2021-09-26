const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const documentRouter = require('./router/documents')
const authRouter = require('./router/auth')
const passport = require('passport');
const session = require('express-session');
require("./utils/auth")

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({ secret: 'session of pasteme' }));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");

// connect to database
mongoose.connect("mongodb://localhost:27017/pasteme", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

app.use("/",documentRouter)
app.use("/auth",authRouter)

app.listen(8000, () => {
  console.log("listening on port 8000");
});
