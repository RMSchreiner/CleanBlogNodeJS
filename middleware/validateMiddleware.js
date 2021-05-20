module.exports = (req,res,next)=>{
    if(req.files == null || req.body.title == null){
      return res.redirect('/posts/new') //this is a redirect for if the files in null it redirects back to new post
    }
    next() //middle ware closes with next()
  };