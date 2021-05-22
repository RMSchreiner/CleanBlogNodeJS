const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

const app = new express();
const ejs = require("ejs");
const {resourceUsage} = require('process');



const fileUpload = require('express-fileupload');
const validateMiddleware = require("./middleware/validateMiddleware");
const expressSession = require('express-session');
const flash = require('connect-flash')
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.set("view engine", "ejs");

global.loggedIn = null;

const { start } = require("repl");



app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({createParentPath:true}));
app.use('/posts/store/',validateMiddleware);
app.use(expressSession({secret:'keyboard cat'}));
app.use(flash());

app.use("*",(req,res,next) =>{
  loggedIn = req.session.userId;
  next()
});

app.listen(4000,() => {
  console.log("App listening on port 4000");
});

const homeController = require('./controllers/home')
const newPostController = require('./controllers/newPost')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPosts')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


app.get('/',homeController)
app.get('/posts/new',authMiddleware,newPostController)
app.get('/post/:id',getPostController);
app.post('/posts/store',authMiddleware,storePostController);
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)
app.get('/auth/logout',logoutController)
app.use((req,res)=>res.render('notfound'));

// app.use((req,res)=>{
//   res.render('notfound')
  // })
