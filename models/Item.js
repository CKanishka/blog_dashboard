//Create a model for our database

const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const itemSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    email:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        default:0
    }
})

module.exports=Item=mongoose.model('item',itemSchema);