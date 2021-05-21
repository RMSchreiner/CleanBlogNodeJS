module.exports = (req,res,next) =>{
    if(req.session.userId){
        return res.redirect('/')
        //if the user logged in , redirect to homepage
    }
    next()
}