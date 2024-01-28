import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import './css/Update.css'

const Update = () => {

  const defaultCategory = "earrings";
    const [product,setProducts] = useState({
        prod_name:"",
        prod_description:"",
        prod_price:null,
        prod_image:"",
        category:defaultCategory,
    });

    const navigate = useNavigate()
    const location = useLocation()
    const prodId = location.pathname.split("/")[2];

    const handleChange = (e) => {
      setProducts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) =>{
        e.preventDefault()
        try{
            await axios.put("http://localhost:8800/update/"+prodId, product)
            navigate("/admin")
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
      // Manually trigger handleChange to ensure default value is set in the state
      handleChange({ target: { name: "category", value: defaultCategory } });
    }, [defaultCategory]);

    console.log(product)

  return (
    <div className='main-container'>
    <div className='form'>
      <h1>Update new product</h1>
      <input type="text" placeholder='Product name' name='prod_name' onChange={handleChange}/>
      <input type="text" placeholder='Product description' name='prod_description' onChange={handleChange}/>
      <input type="number" placeholder='Product price' name='prod_price' onChange={handleChange}/>
      <input type="file" placeholder='Product image' name='prod_image' onChange={handleChange}/>
      <select defaultValue={defaultCategory} onChange={handleChange} name="category" className="add-prod-category-options">
                            <option value="earrings">Earrings</option>
                            <option value="bracelets">Bracelets</option>
                            <option value="necklaces">Necklaces</option>
                            <option value="rings">Rings</option>
      </select>
      <button onClick={handleClick} className='admin-update'>Update</button>
    </div>
    </div>
  )
}

export default Update
