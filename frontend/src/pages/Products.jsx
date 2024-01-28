import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchAllProducts = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/products")
                setProducts(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
    },[])

    const handleDelete = async(id)=>{
        try{
            await axios.delete("http://localhost:8800/delete-product/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div>
      <h1>Manawari Products</h1>
      <div className="products">
        {products.map((product)=>(
            <div className="product" key={product.id}>
                {product.prod_image && <img src={require(`../components/Images/${product.prod_image.split('\\').pop()}`)} alt="" /> } 
                <p>{product.prod_image.split('\\').pop()}</p>
                <h2>{product.prod_name}</h2>
                <p>{product.prod_description}</p>
                <span>{product.prod_price}</span>
                <button className='delete' onClick={()=>handleDelete(product.id)}>Delete</button>
                <button className='update'><Link to={`/update/${product.id}`}>Update</Link></button>
            </div>
        ))}
        
      </div>
      <button><Link to="/add">Add new product</Link></button>
    </div>
  )
}

export default Products
