import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  const getAllProducts = async () => {
    const response = await fetch("http://localhost:8080/api/product/getallproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    const result = await response.json();
    if (result) {
      setProducts(result)
    }
  }


  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/api/product/deleteproduct/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      }
    })

    const result = await response.json();
    if (result) {
      getAllProducts()
    }
  }

  const handleSearch = async (e) => {
   
    if(e.target.value === "") {
      getAllProducts();

    } else {
      const response = await fetch(`http://localhost:8080/api/product/search/${e.target.value}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      });
      const result = await response.json();
      setProducts(result);
    }
  }
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getAllProducts();
    } else {
      navigate("/signup")
    }

  }, [])

  return (
    <div >
      <h1 style={{ textAlign: "center" }}>Your Products</h1>
      <input onChange={handleSearch} style={{ marginLeft: "45%", padding: "0.5rem", border: "1px solid skyblue" }} type="text" placeholder='Search...' />
      <div style={{ display: "flex", width: "1000px", margin: "auto" }}>

        {
          products.length == 0 ? <h1 style={{textAlign:"center"}}>No Data Found</h1> : products.map((product, i) => {
            return <div key={product._id} className='card'>
              <h2>Product-{i + 1}</h2>
              <p>Name: {product.title}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.category}</p>
              <p>Company: {product.company}</p>
              <Link type="button" to={`/updateproduct/${product._id}`} style={{ margin: "1px" }} className='btn'>Update</Link>
              <button onClick={() => { handleDelete(product._id) }} type="button" style={{ margin: "1px" }} className='btn'>Delete</button>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default Product
