import express from "express";
const app = express();

app.get("/hello",(req,res)=>{
    return res.send("hello");
})

app.get("/",(req,res)=>{
    return res.send("welcome");
})

app.listen(8000,()=>{
    console.log("Server is Listing at PORT 8000")
})
