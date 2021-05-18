const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
});


const app = new express();
const ejs = require("ejs");

const fileUpload = require('express-fileupload')

const BlogPost = require('./models/BlogPost.js')

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

const { start } = require("repl");
//mongoose.connect(process.env.DATABASE_URL, {

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.get("/", async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index',{
        blogposts
    });
})
app.get("/about", (req, res) => {
  res.render("about");
  
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/post/:id",async (req,res) => {
  const blogpost = await BlogPost.findById(req.params.id)
  res.render('post',{
    blogpost
  })
});

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.post('/posts/store',async (req,res) =>{
  let image = req.files.image;
  image.mv/(path.resolve(__dirname,'public/img',image.name),async(error)=>{
    //model creates a new doc with browser data
    await BlogPost.create({...req.body,image:'/img/'+image.name})
    res.redirect('/');
});
});
