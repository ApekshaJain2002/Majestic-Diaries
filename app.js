//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/blogDB", {useNewUrlParser: true});




const postSchema = {
  postTitle: String,
  postBody: String
};

const Post = mongoose.model("Post",postSchema);

const homeStartingContent = "Welcome to our website! We are thrilled to have you here. Whether you're a first-time visitor or a regular reader, we hope you'll find valuable information, inspiration, and entertainment in our content. Our website is dedicated to bringing you the latest trends, insights, and tips on a variety of topics. From technology to travel, lifestyle to health, we cover it all. So, sit back, relax, and embark on a journey of knowledge and discovery with us.";
const aboutContent = "We are a passionate team of writers, enthusiasts, and experts who love to share our knowledge and experiences with the world. Our mission is to provide informative and engaging content that caters to diverse interests and demographics. With years of collective experience, we strive to be a reliable source of information that you can count on.";
const contactContent = "contact any time  at our maail AJ@mail.com";
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  Post.find({})
  .then(
    (posts) => {
      res.render("home", {
        homeContent: homeStartingContent,
        posts: posts
      });
    })
  .catch(
    (err) => {
        console.log(err);
    });
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent: aboutContent});
})

app.get("/contact",function(req,res){
  res.render("contact",{contactContent: contactContent});
})

app.get("/compose",function(req,res){
  res.render("compose");
})

app.post("/compose",function(req,res){
  const post = new Post({
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  });
  post.save().then((doc) => {res.redirect("/");}).catch((err) => {console.log(err);});
})

app.get("/posts/:postId",function(req,res){
  Post.findOne({_id: req.params.postId})
  .then(
    (post) => {
      res.render("post",{
        postTitle: post.postTitle,
        postBody: post.postBody
      });
    })
  .catch(
    (err) => {
      console.log(err);
    });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
