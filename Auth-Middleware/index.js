const express = require("express");
const jwt = require("jsonwebtoken")  // 1.require the library
const app = express();
const JWT_SECRET = "npmjwt"  // 2. Create a secret variable 
app.use(express.json());  

 

const users = [];   

console.log(users);

app.get("/", function(req, res) {
    res.sendFile("./public/index.html")
})

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

        const token = jwt.sign({ // 3. Convert username into jwt
            username:username  
        },JWT_SECRET);

        res.json({
             token:token
        })
    }
    else{
        res.status(404).send({
            message:"Invalid username and password"
        })
    }
    console.log(users);
})

function auth(req,res,next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_SECRET);

    if(decodedData.username){
        req.username = decodedData.username
        next();

    }
    else{
        res.status(404).send({
            message:"Yor are not allowed"
        })
    }

}

app.get("/me",auth,(req, res) => {
    const token = req.headers.token;

    try {
        
        const decodedInformation = jwt.verify(token, JWT_SECRET); // 4. Verify the token and decode the information
        const username = decodedInformation.username;

       
        const user = users.find((user) => user.username === req.username); //5. Find the user by username
        if (user) {
            res.json({
                message: "Successful",
                user: user
            });
        } else {
            res.status(404).send({
                message: "Unauthorized"
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "Invalid token"
        });
    }
});

app.listen(3000,()=>{
    console.log("successful");  
})