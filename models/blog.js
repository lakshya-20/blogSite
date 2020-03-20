var mongoose=require('mongoose')

var today = new Date();
var date = today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var modelName="blogs"

var likesSchema=new mongoose.Schema({
    person:{
        type:String,
        required:true,
        default:" "
    },
    date:{
        type:String,
        default:dateTime
    }
});

var blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    header:{
        type:String,
        default: ""
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    dateCreated:{
        type:String,
        default:dateTime
    },
    noOfLikes:{
        type:Number,
        default:0
    },
    likes:[likesSchema]
})

module.exports=mongoose.model(modelName,blogSchema,modelName)