const express = require("express");
const app = express();

app.use(express.json());
const gernerateTokens = ()=>{
    return Math.random();

}

const users = [];

app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

users.push({
    username:username,
    password:password
})
res.json({
    message:"You are signed in"
})

})

app.post("/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username == username && u.password == password){
            return true;
        }
        else{
            return false;
        }
    })
    if(foundUser){
        const token = gernerateTokens();
        foundUser.token = token

        res.json({
             token:token
        })
    }
    else{
        res.status(404).send({
            message:"Invalid username and password"
        })
    }
    
})

app.listen(3000,()=>{
    console.log("successful");  
})