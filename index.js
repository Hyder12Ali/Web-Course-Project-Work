var express = require("express")
var bodyparser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/startup_log');

var db = mongoose.connection;

db.on('error',()=>console.log("NOT COnnected to DB"));
db.once('open',()=>console.log("Connected DB"))

app.post("/signin",(req,res)=>{
    var username = req.body.usrname;
    var password = req.body.paswd;
     
    db.collections.findone({username: username,password: password, function(err,users){
        if(err)
        {
            console.log(err);
            return res.status(500).send();
        }
        if(!user){
            return res.status(400).send();
        }
        return res.status(200).send();
    }})
    
})


app.post("/signup",(req,res)=>{
    var username = req.body.usrname;
    var password = req.body.paswd;
    var email = req.body.eml;
    var contactno = req.body.contctno;

    var data = {
    "username": req.body.usrname,
    "password": req.body.paswd,
    "email":req.body.eml,
    "contactno": req.body.contctno
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err)
        {
            throw err;
        }
        console.log("Signup Successfull");
    });

    return res.redirect('signin.html')

})

app.get("/",(req,res)=>{
 res.set({
     "Allow-access-Allow-Origin": '*'
 })
 return res.redirect('signup.html');
}).listen(3111);



console.log("listening port 3111");
