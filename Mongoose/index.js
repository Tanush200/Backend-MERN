const express = require("express");
const app = express();
const { UserModel , TodosModel } = require("./db")

app.use(express.json());

app.post("/signup",(req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    UserModel.insert({
        name:name,
        email:email,
        password:password
    })

    res.json({
        message:"You are Logged in"
    })

})

app.post("/login",(req,res)=>{

})

app.post("/todo",(req,res)=>{

})

app.get("/todos",(req,res)=>{

})

app.listen(3000,()=>{
    console.log("Server started");
})