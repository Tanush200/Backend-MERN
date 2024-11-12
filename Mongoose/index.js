// Express
const express = require("express");
const app = express();

// JWT
const jwt = require("jsonwebtoken");
const JWT_SECRET = "kfjqiofqefjiqe";

// Mongoose
const { default: mongoose } = require("mongoose");
mongoose.connect("mongodb://localhost:27017/hashPassword")
const { UserModel , TodosModel } = require("./db")

// Bcrypt
const bcrypt = require("bcrypt");  // 1.import bcrypt library.....

// Middleware
app.use(express.json());



app.post("/signup",async function(req,res){
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword =await bcrypt.hash(password,5)  // 2.hashing password

   await UserModel.create({       
        name:name,
        email:email,
        password:hashedPassword
    })

    res.json({
        message:"You are Logged in"
    })

})

app.post("/login",async function(req,res){
    const email = req.body.email;
    const password = req.body.password;

    const user =await UserModel.findOne({    // Read
        email:email,
        password:password
    })

    if(!response){
        res.status(404).json({
            message:"No Response"
        })
    }
     
    const passwordMatched = bcrypt.compare(password,response.password); // 3.Compare the hashedPassword

    if(passwordMatched){
        const token = jwt.sign({
            id:user._id.toString()  // Because That id is a ObjectId..Convert to string
        },JWT_SECRET)
        res.json({
            token:token
        })
    }
    else{
        res.status(404).json({
            message:"Wrong Credintials"
        })
    }


})

function auth(req,res,next){    // This middleware function checks or verify if user logged in or not
     const token = req.headers.token;

    const decodedData = jwt.verify(token,JWT_SECRET);

    if(decodedData){
        req.userId=decodedData.id;
        next();
    }
    else{
        res.status(404).json({
            message:"Wrong credentials"
        })
    }

}


app.post("/todo",auth,async function(req,res){
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodosModel.create({
        userId,
        title,
        done
    })


    res.json({
        message:"Todo Created"
    })

})

app.get("/todos",auth,async function(req,res){
    const userId = req.userId;

    const todos =await TodosModel.findOne({
        userId
    })
    res.json({
        todos
    })
})

app.listen(3000,()=>{
    console.log("Server started");
})