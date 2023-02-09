const mongoose=require("mongoose");
const {Schema}=mongoose;

const productSchema= new Schema({
    title:String,
    price:String,
    category:String,
    company:String,
    user:{ type: Schema.Types.ObjectId, ref: 'product' }
})

const Product=mongoose.model("product",productSchema);
module.exports=Product;