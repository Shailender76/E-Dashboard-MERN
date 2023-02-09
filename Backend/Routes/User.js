
const express=require("express");
const router=express.Router();
const User=require("../Models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const SECRET_KEY="Shailenderisagood$developer"
const {validationResult,body}=require("express-validator");
const verifyToken=require("../Middleware");

//api for signup
router.post("/signup",[
    body("name","Please enter valid name").isLength({min:3}),
    body("email","Please enter valid email").isEmail(),
    body("password","Please enter valid password").isLength({min:6})
],async(req,res)=>{
  const errors=  validationResult(req);
  if(!errors.isEmpty()){
  return  res.status(400).json({errors:errors.array()});

  }
let user=await User.findOne({email:req.body.email});
if(user){
    return res.status(400).json({error:"Email already exists"});
}
const salt=await bcrypt.genSalt(10);
const secPass=await bcrypt.hash(req.body.password,salt);

 user= await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
});
const data={user:user.id}
// console.log(data)
const auth=jwt.sign(data,SECRET_KEY)

if(user){
    res.status(200).json({success:true,user,auth});
}else{
    res.status(500).send("Internal server error")
}
})

// api for login
router.post("/login",[
    body("email","Please enter a valid email").isEmail().notEmpty(),
    body("password","Please enter a valid password").isLength({min:6}).notEmpty()
],async(req,res)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}
let user=await User.findOne({email:req.body.email});
if(!user){
    return res.status(400).json({error:"user does not exist"})
}
const checkPass=await bcrypt.compare(req.body.password,user.password);
if(!checkPass){
    return res.status(400).json({error:"user does not exist"})
}
const data={user:user.id};
const auth=jwt.sign(data,SECRET_KEY)
if(user){
    res.status(200).json({success:true,user,auth})

}else{
    res.status(500).send("Internal server error")
}

})

// api for getting user details
router.get("/userdetails",verifyToken,async(req,res)=>{
    const user=await User.findById(req.user).select("-password");
    if(user){
        res.status(200).json(user)
    }else{
        res.status(500).send("Internal server error")
    }
});


module.exports=router;