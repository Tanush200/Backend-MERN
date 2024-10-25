const express = require("express")
const app = express();

app.get("/",(req,res)=>{
    res.send("Tanush Saha");

})
app.listen(3000);