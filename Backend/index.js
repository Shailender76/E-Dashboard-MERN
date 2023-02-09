const express=require("express");
const app=express()
const connectDb=require("./Db")
const PORT=8080;
const cors=require("cors");
connectDb();

//Middleware
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Hello Backend")
})


//Middleware
app.use("/api/user",require("./Routes/User"));
app.use("/api/product",require("./Routes/Product"));

app.listen(PORT,()=>{
    console.log(`App started successfully on port ${PORT}.`)
})