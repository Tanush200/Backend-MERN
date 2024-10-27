const express = require("express");
const app = express();

app.use(express.json());  // Middleware

const gernerateTokens = ()=>{ // token generator Function
    return Math.random();
}

const users = [];   // Array for Storing username & password

app.post("/signup",(req,res)=>{  // HTTP
    const username = req.body.username;  // Use middleware for displaying data in body from postman 
    const password = req.body.password;

users.push({
    username:username,   // push username & password in users Array
    password:password
})
res.json({
    message:"You are signed in"  // After signup...Display this message
})

})

app.post("/signin",(req,res)=>{
    const username = req.body.username;  // Use middleware for displaying data in body from postman After signup
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username == username && u.password == password){  // If same username & password found return true
            return true;
        }
        else{
            return false;
        }
    })
    if(foundUser){
        const token = gernerateTokens();  // If find generate a token 
        foundUser.token = token  // Store also the token in usersArray

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