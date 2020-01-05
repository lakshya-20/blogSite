var express=require('express')
var mongoose=require('mongoose')
var Blogs=require('../models/blog')
var bodyParser=require('body-parser')

var blogRouter= express.Router()
blogRouter.use(bodyParser.json())

blogRouter.route('/blog')
/*
.get(function(req,res){
    Blogs.find({'author':req.user.username}).toArray(function(err,docs){
        if(err){
            res.status(500).send("Error Occured");
            console.log("khiuhih")
        }
        else{
            res.json(docs)
            console.log("Entered 1")
        }
    })
})
*/
blogRouter.get('/blog/:username', (req, res) => {
    //console.log(req.params.username)
  Blogs.find({author:req.user.username}).sort({dateCreated: -1}).exec(function(err, files){
    // Check if files
    //res.json(files);
    res.render('dashboard',{files:files})   
  });
});

blogRouter.post('/blog',function(req,res){
    req.body.author=req.user.username
    console.log(req.user.username)
    Blogs.create(req.body,function(err,doc){
        if(err){
            console.log(err);
            res.status(500).send("Db error")
        }
        else{
            console.log("Blog Inserted")
        }
    })
    res.redirect('/blog/blog')
})

module.exports=blogRouter;