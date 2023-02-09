const jwt=require("jsonwebtoken");
const SECRET_KEY="Shailenderisagood$developer"

const verifyToken=(req,res,next)=>{
    const token=req.header("auth-token");
    if(!token){
res.status(400).send("Please send auth-token")
    }else{
const data=jwt.verify(token,SECRET_KEY);
req.user=data.user;
next();
    }
}

module.exports=verifyToken;