const express  = require("express")
const app = express();
 const bodyParsor = require("body-parser")

 app.use(bodyParsor.json())

// app.get("/sum",(req,res)=>{
//     console.log(req.body);
//     const a = parseInt(req.query.a);  // query parameters (/?a=2&b=3)
//     const b = parseInt(req.query.b)

//      res.json({
//         answer: a+b
//      })
// })
app.post("/sum",(req,res)=>{
    console.log(req.body);
    const a = parseInt(req.body.a);  // query parameters (/?a=2&b=3)
    const b = parseInt(req.body.b)

     res.json({
        answer: a+b
     })
})
app.listen(3000,()=>{
    console.log("Successful");

});