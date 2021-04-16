const mongoose = require("mongoose");

const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database", { useNewUrlParser: true });


//create blog
BlogPost.create(
  {
    title: "The Mythbuster's Guide to SAving Money on Energy Bills",
    body:
      "If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills",
  },
  (error, blogpost) => {
    console.log(error, blogpost);
  }
);

//bytitle
BlogPost.find({}, (error, blogpost) => {
  console.log(error, blogpost);
});

//bysearchword
BlogPost.find({ title: /The/ }, (error, blogpost) => {
  console.log(error, blogpost);
});

//byID
BlogPost.findById(id, (error, blogpost) => {
  console.log(error, blogpost);
});

//findbyIDandUpdate
BlogPost.findByIdAndUpdate(id,{title:'UpdatedTitle'},(error,blogpost) => {
    console.log(error,blogpost)
})

//find by ID and delete
BlogPost.findByIdAndDelete(id, (error, blogpost)=> {
    console.log(error,blogpost)
})



