const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const documentRouter = require('./router/Documents')

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");

// connect to database
mongoose.connect("mongodb://localhost:27017/pasteme", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

app.use("/",documentRouter)


app.listen(8000, () => {
  console.log("listening on port 8000");
});
