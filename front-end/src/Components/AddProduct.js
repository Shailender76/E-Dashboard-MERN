import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate=useNavigate();
  const [product,setProduct]=useState({title:"",price:"",category:"",company:""})

const onConvert=(e)=>{
  setProduct({...product,[e.target.name]:e.target.value})
}

const handleAddProduct=async()=>{
//   // console.log(product.title,product.category,product.price,product.company)
const response =await fetch("http://localhost:8080/api/product/createproduct",{
  method:'POST',
  headers:{
    "Content-Type":"application/json",
    "auth-token":localStorage.getItem("token")
  },
  body:JSON.stringify(product)
})

const result= await response.json();
// console.log(result)
if(result){
  navigate("/")
}
  setProduct({title:"",price:"",category:"",company:""})
}

useEffect(() => {
  if (!localStorage.getItem("token")) {
    navigate("/signup")
  } 
}, [])

  return (
    <div className='addproduct-form'>
      <h1>Add Product here</h1>
      <input onChange={onConvert} type="text" value={product.title} name='title' placeholder='Enter Title' />
      <input onChange={onConvert} type="text" value={product.price} name='price' placeholder='Enter Price' />
      <input onChange={onConvert} type="text" value={product.category} name='category' placeholder='Enter Category' />
      <input onChange={onConvert} type="text" value={product.company} name='company' placeholder='Enter Company' />
      <button onClick={handleAddProduct} type='button' className="btn">Add Product</button>

    </div>
  )
}

export default AddProduct
