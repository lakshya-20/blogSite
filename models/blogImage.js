var mongoose =require('mongoose');

var today=new Date();
var date = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
var time = today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
var dateTime= date+' '+time;

var modelName='blogImage';

var imageSchema=new mongoose.Schema({
    blogId:{
            
    },
    file:{
    
    }
})

module.exports=mongoose.model(modelName,imageSchema,modelName);