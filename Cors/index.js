// Serve the HTML File on a different port..
// cd public
// npx serve

const express = require("express")
const app = express();
// const path = require("path")
const cors = require("cors");

app.use(express.json());
app.use(cors());

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"Cors","index.html"))
// })



app.post("/sum",(req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        answer:a+b
    })
})

app.listen(3000,()=>{
    console.log("Successful");
})