module.exports = (req,res) =>{
   var username ="";
   var password ="";
   
   const data = req.flash('data')[0];

   if(typeof data !="undefined"){
       username = data.username;
       password = data.password;
   }

res.render('register',{
    //flash enables us to flush the errors during login rather than store in the session npm install that enables the temp saving of the session data
    errors: req.flash('validationErrors'),
    username: username,
    password: password
})    
}
