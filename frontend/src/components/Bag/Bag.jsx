import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Bag.css';
import removeIcon from '../Images/subtracting-button.png';
import addIcon from '../Images/add.png';
import { calculateTotalQuantity } from '../NavigationBar/BagUtils';

const Bag = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await axios.get('http://localhost:8800/bag-items');
        setProducts(res.data);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8800/bag-items');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (productId, productName, productPrice, productImg) => {
    try {
      console.log('Adding product to bag:', productId, productName, productPrice);
      await axios.post('http://localhost:8800/add-to-bag', {
        product_id: productId,
        product_name: productName,
        product_price: productPrice,
        quantity: 1,
        product_img: productImg,
      });

      // Fetch updated bag data
      await fetchAllProducts();

      console.log('Product added to bag successfully');
      //alert('Product added to bag successfully');
    } catch (err) {
      console.error('Error adding product to bag:', err);
      console.error('Error message:', err.message);
      alert('Error adding product to bag');
    }
  };

  const handleRemove = async (productId, productName, productPrice, productImg) => {
    try {
      console.log('Removing product from bag:', productId, productName, productPrice);
      await axios.post('http://localhost:8800/add-to-bag', {
        product_id: productId,
        product_name: productName,
        product_price: productPrice,
        quantity: -1,
        product_img: productImg,
      });

      // Fetch updated bag data
      await fetchAllProducts();

      console.log('Product removed from bag successfully');
      //alert('Product removed from bag successfully');
    } catch (err) {
      console.error('Error removing product from bag:', err);
      console.error('Error message:', err.message);
      alert('Error removing product from bag');
    }
  };

  const handleCheckout = async () => {
    // Ask for confirmation before deleting all items
    const confirmCheckout = window.confirm('Are you sure you want to proceed with the checkout? This will remove all items from your bag.');
    
    if (confirmCheckout) {
      try {
        // Perform checkout (delete all items)
        await axios.post('http://localhost:8800/checkout');
        
        // Fetch updated bag data
        await fetchAllProducts();
        
        console.log('Checkout successful');
        alert('Checkout successful');
      } catch (err) {
        console.error('Error during checkout:', err);
        console.error('Error message:', err.message);
        alert('Error during checkout');
      }
    }
  };

  const subtotal = products.reduce((acc, product) => acc + product.product_price * product.quantity, 0);
  const total = subtotal; // Add shipping fee or any other fees if needed

  return (
    <div className='product-main-bag'>
      {products.length === 0 ? (
        <p className='empty-bag'>Your bag is empty</p>
      ) : (
        <div className='product-container'>
          <div className='products-bag'>
            {products.map((product) => {
              if (product.quantity > 0) {
                return (
                  <div className='product-bag' key={product.id}>
                    <div className='col1'>
                      {product.product_img && (
                        <img src={require(`../Images/${product.product_img.split('\\').pop()}`)} alt='' />
                      )}
                    </div>
                    <div className='col2'>
                      <h2>{product.product_name}</h2>
                      <p>QUANTITY: {product.quantity}</p>
                      <div>
                        <p className='price'>{product.product_price * product.quantity} PHP</p>
                        <span>
                          <img
                            onClick={() => handleRemove(product.product_id, product.product_name, product.product_price, product.product_image)}
                            className='remove-icon'
                            src={removeIcon}
                            alt=''
                          />
                          <p>{product.quantity}</p>
                          <img
                            onClick={() => handleAdd(product.product_id, product.product_name, product.product_price, product.product_image)}
                            className='add-icon'
                            src={addIcon}
                            alt=''
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="bag-items-down">
            <div className="bag-items-total">
              <hr />
              <div>
                <div className="bag-items-total-item">
                  <p>Subtotal</p>
                  <p>{subtotal} PHP</p>
                </div>
                <div className="bag-items-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <div className="bag-items-total-item">
                  <h3>Total</h3>
                  <h3>{total} PHP</h3>
                </div>
              </div>
              <div className='button-container'>
                <button onClick={handleCheckout}>CHECK OUT</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Bag;
