const express = require("express"),
      app = express(),
      bodyParser = require("body-parser");

app.set("view engine","ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.listen(3000,()=>{
    console.log("server initiated");
})