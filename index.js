const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
app.set("view engine", "ejs");
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const BlogPost = require('./models/BlogPost.js')

const mongoose = require("mongoose");
//mongoose.connect(process.env.DATABASE_URL, {
mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.use(express.static("public"));

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.get("/", (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts:blogposts
    });
})
app.get("/about", (req, res) => {
  res.render("about");
  
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/post", (req, res) => {
  res.render("post");
});
app.get("/posts/new", (req, res) => {
  res.render("create");
});
app.post('/posts/store', async(req,res) =>{
    //model creates a new doc with browser data
    await BlogPost.create(req.body)
    res.redirect('/')
})
