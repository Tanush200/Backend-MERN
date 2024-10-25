const express  = require("express")
const app = express();
 

app.get("/sum",(req,res)=>{
    const a = parseInt(req.query.a);  // query parameters (/?a=2&b=3)
    const b = parseInt(req.query.b)

     res.json({
        answer: a+b
     })
})

app.listen(3000,()=>{
    console.log("Successful");

});