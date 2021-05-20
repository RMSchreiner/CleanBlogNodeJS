const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
});

const app = new express();
const ejs = require("ejs");
const {resourceUsage} = require('process');

const fileUpload = require('express-fileupload');
const validateMiddleware = require("./middleware/validateMiddleware");

app.set("view engine", "ejs");


const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPosts')

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use('/posts/store/',validateMiddleware);

app.listen(4000,() => {
  console.log("App listening on port 4000");
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.get('/',homeController)
app.get('/posts/new',newPostController)
app.get('/post/:id',getPostController);
app.post('/posts/store',storePostController);

app.get("/about", (req, res) => {
  res.render("about");
})
app.get("/contact", (req,res) => {
  res.render('contact');
  })
