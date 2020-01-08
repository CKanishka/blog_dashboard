const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors = require('cors');
const mongoURI=process.env.MONGODB_URI||'mongodb://kc:kc12345@ds261430.mlab.com:61430/users'

const app=express(); //initializing express

const items=require('./routes/api')   //importing the route file

//connecting to mongo
mongoose.connect(mongoURI)
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.log(err));

app.use(cors());
//applying middleware bodyparser
app.use(bodyParser.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
}


//using route
app.use('/api',items); 

const port =process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server running on port: ${port}`))

