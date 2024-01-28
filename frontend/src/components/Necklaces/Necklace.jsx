import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Necklace.css';
import { useNavigate } from 'react-router-dom';



const Necklace = () => {
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

  const handleAddToBag = async (productId, productName, productPrice, productImg) => {

    console.log(productImg)
    if (!localStorage.getItem('email')) {
      alert('Please log in first');
      navigate("/signin")
    }
    else{
      try {
        console.log('Adding product to bag:', productId, productName, productPrice);
    
        // Use axios.post instead of axios.get for sending data in the request body
        await axios.post('http://localhost:8800/add-to-bag', {
          product_id: productId,
          product_name: productName,
          product_price: productPrice,
          quantity: 1,
          product_img: productImg,
        });
    
        console.log('Product added to bag successfully');
        // You may want to update the local state or perform additional actions here
        //alert('Product added to bag successfully');
      } catch (err) {
        console.error('Error adding product to bag:', err);
        console.error('Error message:', err.message);
        alert('Error adding product to bag');
      }
    }
    
    
  };

  return (
    <div className='product-main'>
      <div className="products">
        {products.map((product) => {
          // Check if the product category is "necklaces"
          if (product.category === "necklaces") {
            return (
              <div className="product" key={product.id}>
                {product.prod_image && <img src={require(`../Images/${product.prod_image.split('\\').pop()}`)} alt="" />}
                <h2>{product.prod_name}</h2>
                <p>{product.prod_description}</p>
                <span>{product.prod_price} PHP<button className='add-to-bag-button' onClick={() => handleAddToBag(product.id, product.prod_name, product.prod_price,product.prod_image)}>Add to bag</button></span>
              </div>
            );
          }
          // If the product category is not "necklaces", return null or an empty fragment
          return null;
        })}
      </div>
      {/* <button><Link to="/add">Add new product</Link></button> */}
    </div>
  );
};

export default Necklace;
