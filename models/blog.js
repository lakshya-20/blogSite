var mongoose=require('mongoose')

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var modelName="blogs"

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
    image:{
        type:String,
        default:" "
    }
})

module.exports=mongoose.model(modelName,blogSchema,modelName)