var express=require('express')
var mongoose=require('mongoose')
var Blogs=require('../models/blog')
var User=require('../models/user')
var bodyParser=require('body-parser')

var profileRouter=express.Router()
profileRouter.use(bodyParser.json())

profileRouter.get('/profile',function(req,res){
    var noOfLikes=0;
    User.find({username:req.user.username}).exec(function(err,user){
        Blogs.find({author:req.user.username}).exec(function(err,blogs){
            blogs.forEach(function(blog){
                blog.likes.forEach(function(like){
                    noOfLikes+=1;
                })
            })
            var noOfBlogs=blogs.length;
            res.render('profile',{files:blogs,user:user,noOfBlogs:noOfBlogs,noOfLikes:noOfLikes,username:req.params.username})
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
            })
        }
        
        else{
            var check=0;
        doc.likes.forEach(function(like){
            if(like.person==username){
                check=1;
            }
        })
        if(check==0){
            Blogs.findOne({_id:req.params.blogId},function(err,doc){
                req.body.noOfLikes=++req.body.noOfLikes;
                req.body.person=req.user.username   
                doc.likes.push(req.body);
                doc.save();
            })
        }
    }
    res.redirect('/profile/profile/'); 
        })
})
profileRouter.get('/publicProfile',function(req,res){
    
})
profileRouter.post('/blog/:blogId/delete',function(req,res){
    console.log(req.params.blogId)
    Blogs.findByIdAndRemove(req.params.blogId,function(err,doc){
        if(err){
            res.status(200).send("Db error")
        }
        else{
            console.log("Blog Deleted")
        }
        res.redirect('/profile/profile/');
})
}); 
profileRouter.get('/blog/:blogId/edit',function(req,res){
    Blogs.find({_id:req.params.blogId},function(err,doc){
        if(err){
            res.status(200).send("Db error")
        }
        else{
            res.render('editBlog',{files:doc})
        }
    })
})
profileRouter.post('/blog/:blogId/edit',function(req,res){    
    Blogs.findByIdAndUpdate(req.params.blogId,{$set:req.body},function(err,doc){
        if(err){
            res.status(200).send("Db Error")
        }
        else{
            console.log("Blog Updated")
            res.redirect('/profile/profile/');
        }
    })
    
})


module.exports=profileRouter;