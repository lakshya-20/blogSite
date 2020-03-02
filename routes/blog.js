var express=require('express')
var mongoose=require('mongoose')
var fs=require('fs')
var fileUpload=require('express-fileupload');
var mongodb=require('mongodb')


var Blogs=require('../models/blog')
var BlogImages=require('../models/blogImage')
var bodyParser=require('body-parser')
var binary=mongodb.Binary

var blogRouter= express.Router()
blogRouter.use(bodyParser.json())

blogRouter.get('/blog',function(req,res){
    Blogs.find().sort({dateCreated:-1}).exec(function(err,docs){
        if(err){
            res.status(500).send("Error Occured");
        }
        else{
            res.render('public',{files:docs})
        }
    })
})

blogRouter.get('/blog/:username', (req, res) => {
    Blogs.find().sort({dateCreated:-1}).exec(function(err,docs){
        if(err){
            res.status(500).send("Error Occured");
        }
        else{
            res.render('dashboard',{files:docs})
        }
    })
});

blogRouter.post('/blog',function(req,res){
    let blogId;
    req.body.author=req.user.username
    console.log(req.user.username)
    Blogs.create(req.body,function(err,doc){
        if(err){
            console.log(err);
            res.status(500).send("Db error")
        }
        else{
            console.log("Blog Inserted")
            blogId=doc._id
            console.log(blogId)
            let file={blogId:blogId, file:binary(req.body.uploadedFile)}
            BlogImages.create(file,function(err,doc){
            if(err){
                console.log("Error while uploading file: ",err);
            }
            else{
                console.log("File Inserted")
            }
            })
            }
        })


    
    
    var username=req.user.username
  res.redirect('/blog/blog/'+username);
})

blogRouter.post('/blog/:blogId/delete',function(req,res){
    console.log(req.params.blogId)
    Blogs.findByIdAndRemove(req.params.blogId,function(err,doc){
        if(err){
            res.status(200).send("Db error")
        }
        else{
            console.log("Blog Deleted")
        }
        res.redirect('/blog/blog/'+req.user.username);
    })
})
blogRouter.get('/blog/:blogId/edit',function(req,res){
    Blogs.find({_id:req.params.blogId},function(err,doc){
        if(err){
            res.status(200).send("Db error")
        }
        else{
            res.render('editBlog',{files:doc})
        }
    })
})
blogRouter.post('/blog/:blogId/edit',function(req,res){
    Blogs.findByIdAndUpdate(req.params.blogId,{$set:req.body},function(err,doc){
        if(err){
            res.status(200).send("Db Error")
        }
        else{
            console.log("Blog Updated")
            res.redirect('/blog/blog/'+req.user.username);
        }
    })
})
blogRouter.post('/blog/:blogId/like',function(req,res){
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
        res.redirect('/blog/blog/'+req.user.username);
        })
})

module.exports=blogRouter;