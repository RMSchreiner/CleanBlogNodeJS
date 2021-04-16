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

/*  search  
app.get('/search',(req,res)=>{  
  try {  
  bookModel.find({$or:[{author:{'$regex':req.query.dsearch}},{books:{'$regex':req.query.dsearch}}]},(err,data)=>{  
  if(err){  
  console.log(err);  
  }else{  
  res.render('pages/home',{data:data});  
  }  
  })  
  } catch (error) {  
  console.log(error);  
  }  
  });  
  app.post('/',(req,res)=>{  
  try {  
  var books = new bookModel({  
  author:req.body.author,  
  books:req.body.book  
  });  
  books.save((err,data)=>{  
  if(err){  
  console.log(err)  
  }else{  
  res.redirect('/');  
  }  
  })  
  } catch (error) {  
  console.log(error);  
  }  
  });
  */


