import React, { useState } from 'react';
import axios from 'axios';

const AddToBag = ({ product }) => {
 const [quantity, setQuantity] = useState(1);

 const handleAddToBag = async () => {
    try {
      await axios.post('http://localhost:8800/add-to-bag', {
        product_id: product.id,
        quantity,
      });
      alert('Product added to bag successfully');
    } catch (err) {
      console.log(err);
      alert('Error adding product to bag');
    }
 };

 return (
    <div className="product">
      {product.prod_image && <img src={require(`../Images/${product.prod_image.split('\\').pop()}`)} alt="" />}
      <h2>{product.prod_name}</h2>
      <p>{product.prod_description}</p>
      <span>{product.prod_price} PHP</span>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={handleAddToBag}>Add to bag</button>
    </div>
 );
};

export default AddToBag;