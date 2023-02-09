import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
  const params=useParams();
  const navigate=useNavigate();
  const [update,setUpdate]=useState({title:"",price:"",category:"",company:""});
  const onConvert=(e)=>{
    setUpdate({...update,[e.target.name]:e.target.value})
  }
  const productDetail=async()=>{
    const response=await fetch(`http://localhost:8080/api/product/getproduct/${params.id}`,{
      method:'GET',
      headers:{
        "Content-Type":"application/json",
        "auth-token":localStorage.getItem("token")
      }
    })
    const result=await response.json();
    if(result){
      setUpdate({title:result.title,price:result.price,category:result.category,company:result.company})
    }
  }

  useEffect(()=>{
    productDetail()
  },[])

  const handleUpdate=async()=>{
const response=await fetch(`http://localhost:8080/api/product/updateproduct/${params.id}`,{
  method:'PUT',
  headers:{
    "Content-Type":"application/json",
  "auth-token":localStorage.getItem("token")
  },
  body:JSON.stringify(update)
});
 
const result=await response.json();
// console.log(result)
if(result){
  navigate("/")
}
  }

  return (
    <div>
        <h1 style={{textAlign:"center"}}>Update Product here </h1>
        <div className="update-form">
          <input type="text" onChange={onConvert} value={update.title} name='title' placeholder='Enter Title'/>
          <input type="text" onChange={onConvert} value={update.price} name='price' placeholder='Enter Price' />
          <input type="text" onChange={onConvert} value={update.category} name='category' placeholder='Enter Category' />
          <input type="text" onChange={onConvert} value={update.company} name='company' placeholder='Enter Company'/>
          <button onClick={handleUpdate} type='button' className="btn">Update Product</button>
        </div>
      
    </div>
  )
}

export default UpdateProduct
