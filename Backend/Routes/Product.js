
const express=require("express");
const router=express.Router();
const Product=require("../Models/product");
const {validationResult,body}=require("express-validator");
const verifyToken=require("../Middleware");

// api for creating product
router.post("/createproduct",verifyToken,[
    body("title","Enter a valid title").notEmpty(),
    body("price","Enter valid price").notEmpty(),
    body("category","Enter a valid category").notEmpty(),
    body("company","Enter a valid company").notEmpty()
],async(req,res)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty){
    return res.status(400).json({errors:errors.array()})
   };

let product=new Product({
    title:req.body.title,
    price:req.body.price,
    category:req.body.category,
    company:req.body.company,
    user:req.user
});

product=await product.save();
if(product){
    res.status(200).json(product);
}else{
    res.status(500).send("Internal server error")
}

});


//api for Get all products 

router.get("/getallproducts",verifyToken,async(req,res)=>{
    let products=await Product.find({user:req.user});
    if(products){
        res.status(200).json(products)
    }else{
        res.status(500).send("Internal server error");
    }
});


// api for update product
router.put("/updateproduct/:id",verifyToken,async(req,res)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(400).json({error:"Product does not exist"})
    };
if(product.user.toString()!==req.user){
    return res.status(401).json({error:"Not Allowed"})
}
    const {title,price,category,company}=req.body;
    let newProduct={};
    if(title){
        newProduct.title=title;
    };
    if(price){
        newProduct.price=price;
    }
    if(category){
        newProduct.category=category;
    }
    if(company){
        newProduct.company=company;
    }

    product= await Product.findByIdAndUpdate(req.params.id,{$set:newProduct},{new:true});

    if(product){
        res.status(200).json(product)
    }else{
        res.status(500).send("Internal server error")
    }
})

// api for deleting product
router.delete("/deleteproduct/:id",verifyToken,async(req,res)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
       return res.status(400).json({error:"product does not exist"});
    }

    if(product.user.toString()!==req.user){
      return  res.status(401).json({error:"Not Allowed"});
    }

    product=await Product.findByIdAndDelete(req.params.id);
    if(product){
        res.status(200).json(product);
    }else{
        res.status(500).send("Internal server error")
    }
})

// api for getting a product
router.get("/getproduct/:id",verifyToken,async(req,res)=>{
    let product=await Product.findById(req.params.id);
    if(product){
        res.status(200).json(product);
    }else{
        res.status(500).send("Internal server error")
    }

});

// api for search
router.get("/search/:key",verifyToken,async(req,res)=>{
    let prod=await Product.find({
        "$or":[{ title:{$regex:req.params.key}},
            { price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}

        ],
        user:req.user
    });
    if(prod){
        res.status(200).json(prod)
    }else{
        res.status(500).send("Internal server error")
    }
})

module.exports=router;