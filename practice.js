const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "tanushjwt";
app.use(express.json());

const users = [];

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"You are signedIN"
    })
})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username === username && u.password === password){
            return true;
        }
        else{
            return false;
        }

    })
    if(foundUser){
        const token = jwt.sign({
            username:username
        },JWT_SECRET);
        res.json({
            token:token
        })
    }
    else{
        res.status(404).send({
            message:"NOT FOUND"
        })
    }
    

})


app.get("/me",(req,res)=>{
    const token = req.headers.token;

    const decodedInformation = jwt.verify(token,JWT_SECRET);
    const username = decodedInformation.username

    const user = users.find((user)=>user.username === username);
    if(user){
        res.json({
            message:"Successful",
            user:user
        })
    }
    else{
        res.status(404).send({
            message:"Unauthorized"
        })

    }
})

app.listen(3000,()=>{
    console.log("Successful");
})