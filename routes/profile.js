var express=require('express')
var mongoose=require('mongoose')
var Blogs=require('../models/blog')
var User=require('../models/user')
var bodyParser=require('body-parser')

var profileRouter=express.Router()
profileRouter.use(bodyParser.json())

profileRouter.get('/profile/:username',function(req,res){
    var noOfLikes=0;
    User.find({username:req.params.username}).exec(function(err,user){
        Blogs.find({author:req.params.username}).exec(function(err,blogs){
            blogs.forEach(function(blog){
                blog.likes.forEach(function(like){
                    noOfLikes+=1;
                })
            })
            console.log(noOfLikes);
            var noOfBlogs=blogs.length;
            console.log(user);
            res.render('profile',{blogs:blogs,user:user,noOfBlog:noOfBlogs,noOfLikes:noOfLikes,username:req.params.username})
        })
    })
})
profileRouter.post('/blog/:blogId/like',function(req,res){
    Blogs.findById({_id:req.params.blogId},function(err,doc){
        var username=req.user.username;
        if(doc.likes.length==0){
            Blogs.findOne({_id:req.params.blogId},function(err,doc){
                req.body.noOfLikes=++req.body.noOfLikes;
                req.body.person=req.user.username   
                doc.likes.push(req.body);
                doc.save();
                console.log("Entered2")
            })
        }
        else{
        doc.likes.forEach(function(like){
            console.log(like.person)
            if(like.person==username){
                console.log("Entered");
            }
            else{
                Blogs.findOne({_id:req.params.blogId},function(err,doc){
                    req.body.noOfLikes=++req.body.noOfLikes;
                    req.body.person=req.user.username   
                    doc.likes.push(req.body);
                    doc.save();
                    console.log("Entered2")
                })
            }
        })
    }
        res.redirect('/profile/profile/'+req.user.username);
        })
})
profileRouter.get('/profile',function(req,res){
    console.log("Entered 2");
})


module.exports=profileRouter;