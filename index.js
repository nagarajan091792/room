const express=require("express");
const bodyParser=require("body-parser");
var fs= require("fs");
const app=express();
//room details
const datas=[{
    HOTEL_NAME:"YSR",
    owner_name:"Rafiya",
    TOTAL_ROOM:11,
    PER_DAY:1000,
}]
app.use(bodyParser.urlencoded({
    extended:true
}));
//html file
app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
})

//get room details
app.get("/roomdetails",(req,res)=>{
    res.json(datas)
})
//room booking
app.post("/addUser",function(req,res){
    var id=req.body.id
    var name=req.body.name
    var email=req.body.email
    var phone=req.body.phone;
    var adult=req.body.adult;
    var child=req.body.child
    var checkin=req.body.checkin;
    var checkout=req.body.checkout
    var  A=req.body.A;
    
 var  B=req.body.B;
 var  C=req.body.C;
 var  D=req.body.D;
 var  E=req.body.E;
 var  F=req.body.F;
 var  a=req.body.a;
 var  b=req.body.b;
 var  c=req.body.c;
 var  d=req.body.d;
 var  e=req.body.e;
 var  f=req.body.f;
   



    var obj={};
    var key=req.body.userid;
    var newuser={
        "id":id,
        "name":name,
        "email":email,
        "phone":phone,
        "adult":adult,
        "child":child,
        "checkin":checkin,
        "checkout":checkout,
        "A":A,
        "B":B,
        "C":C,
        "D":D,
        "E":E,
        "F":F,
        "a":a,
        "b":b,
        "c":c,
        "d":d,
        "e":e,
        "f":f
       
    }
    obj[key]=newuser;

//user details json and updateing logic
    fs.readFile("users.json","utf8",function(err,data){
        data=JSON.parse(data);
        data[key]=obj[key];
        console.log(data)
        var upsateuser=JSON.stringify(data);
        fs.writeFile("users.json",upsateuser,function(err){
            res.end(JSON.stringify(data));
        })
    })

})
//specfic user logic
app.post("/specficuser",function(req,res){
    fs.readFile("users.json","utf8",function(err,data){
        var userr=JSON.parse(data);
        var userrr=userr[req.body.id];
        console.log(userrr)
        res.end(JSON.stringify(userrr))
    })

})
//delete user logic
app.post("/deletuser",function(req,res){
    fs.readFile("users.json","utf8",function(err,data){
        data=JSON.parse(data);
        delete data[req.body.id];
        console.log(data)
        var updateuser=JSON.stringify(data);
        fs.writeFile("users.json",updateuser,function(err){
            res.end(JSON.stringify(data))
        })
    })
})
app.listen(process.env.PORT||3000,function(){
    console.log("server running port 3000")
})
