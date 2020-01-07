var express = require('express');
var router = express.Router();

var loggedin=function(req,res,next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/login');
    console.log('User is not loggedin')
  }
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  res.render('login');
});

router.get('/signup',function(req,res,next){
  res.render('signup');
});

router.get('/dashboard',loggedin,function(req,res,next){
  //res.send(req.session);
  var username=req.user.username
  res.redirect('/blog/blog/'+username);
});

router.get('/public',function(req,res,next){
  res.redirect('/blog/blog');
})

router.get('/blog',loggedin,function(req,res,next){
  res.render('blog');
});

router.get('/logout',function(req,res){
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
