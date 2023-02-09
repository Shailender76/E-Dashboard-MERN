const mongoose=require("mongoose");


function connectToMongo(){
    mongoose.connect("mongodb://localhost:27017/E-com-2",()=>{
        console.log("Connect to mongo Successfully")
    })
}

module.exports=connectToMongo