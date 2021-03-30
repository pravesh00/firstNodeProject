const express =require("express");
const app=express();
require('dotenv/config')
const morgan=require('morgan');
const mongoose=require('mongoose');




const api=process.env.API_VER;

app.use(express.json());
app.use(morgan('tiny'));


app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Database Connected");
});

const bnbSchema= mongoose.Schema({
    name:String
});

const bnbModel=mongoose.model('H',bnbSchema);

app.get('/',(req,res)=>{
    res.send("Chal na")
})

app.post('/pro',(req,res)=>{
    const bnb = new bnbModel({
        name:req.body.name
    });
    bnb.save().then((a)=>{
        res.status(201).json(a);

        console.log("Product Added")
    }).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false
        })
    });
});
