const express        = require("express"),
      app            = express(),
      bodyParser     = require("body-parser"),
      mongoose       = require('mongoose'),
      Members        = require('./DBmodels/member');

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose.connect('mongodb+srv://UserArtClub:studio371@artclub.rkj4d.mongodb.net/ArtClubDB?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("DB Connected");
//     }
// });

mongoose.connect('mongodb://localhost/ArtClubDB',{useNewUrlParser: true, useUnifiedTopology: true});

app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup",(req,res)=>{
    console.log(req.body);
   if(Object.keys(req.body).length !== 7 ){
       console.log("Dont be oversmart")
   }

});

app.listen(3000,()=>{
    console.log("server initiated");
    
});