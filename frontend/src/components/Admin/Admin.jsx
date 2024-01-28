import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Admin.css';
import { useNavigate } from 'react-router-dom';



const Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8800/products");
        setProducts(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProducts();
  }, []);


    const handleDelete = async(id)=>{
        try{
            await axios.delete("http://localhost:8800/delete-product/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='admin-product-main'>
    <div className="admin-products">
      {products.map((product) => {
        // Check if the product category is "earrings"
          return (
            <div className="admin-product" key={product.id}>
              {product.prod_image && <img src={require(`../Images/${product.prod_image.split('\\').pop()}`)} alt="" />}
              <h2>{product.prod_name}</h2>
              <p>{product.prod_description}</p>
              <span>{product.prod_price} PHP</span>
              <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button>
              <button className='update'><Link to={`/update/${product.id}`}>Update</Link></button> 
            </div>
          );
        
        // If the product category is not "earrings", return null or an empty fragment
        return null;
      })}
    </div>
  </div>
  )
}

export default Admin
