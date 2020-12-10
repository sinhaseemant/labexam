const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://seemant:5KzHWQQweFrr7hVg@cluster0.tmdoa.mongodb.net/node-angular?authSource=admin",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    app.listen(3000);
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("connection failed ");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Post = require("./models/post");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Accept,Content-Type,Authorization"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  console.log()
  const post = new Post({
    name: req.body.name,
    offense: req.body.offense,
    adNumber: req.body.adNumber,
    amount:req.body.amount,
  });
  post.save();
  res.status(201).json({
    message: "Post added Successfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find()
    .then((documents) => {
      console.log(documents);
      res.status(200).json({
        message: "Posts fetched successfully",
        posts: posts,
      });
    })
    .catch((err) => {});

});

module.exports = app;
