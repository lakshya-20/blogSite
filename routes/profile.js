var express=require('express')
var mongoose=require('mongoose')
var Blogs=require('../models/blog')
var User=require('../models/user')
var bodyParser=require('body-parser')

var profileRouter=express.Router()
profileRouter.use(bodyParser.json())

profileRouter.get('/profile/:username',function(req,res){
    User.find({username:req.params.username}).exec(function(err,user){
        Blogs.find({author:req.params.username}).exec(function(err,blogs){
            var noOfBlogs=blogs.length;
            console.log(user)
            res.render('profile',{blogs:blogs,user:user,noOfBlog:noOfBlogs})
        })
    })
})

profileRouter.get('/profile',function(req,res){
    console.log("Entered 2");
})


module.exports=profileRouter;