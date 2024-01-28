import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'


const Menu = (props) => {
    const {products} = useContext(ShopContext)
    return(
        
            <div className="manawari-products">
                <div className="products">
                    {products.map((item,i)=>{
                        if(props.category === item.category){
                            return <Item key={i} id={item.id} name={item.prod_name} description={item.prod_description} image={item.prod_image} price={item.prod_price} />
                        }
                        else{
                            return null;
                        }
                    })}
                </div> 
            </div>
        
    )
}

export default Menu