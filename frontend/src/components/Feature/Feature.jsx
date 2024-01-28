import React from 'react'
import './Feature.css'
import { Link } from 'react-router-dom'

const Feature = () => {
    return(
        <div className='product-feature'>
            <div class="container">
                <div class="column1">
                    <div class="img7"></div>
                </div>
                <div class="column2">
                    <p>MANAWARI'S BEST SELLER IN 2023</p>
                    <p>Gold dented hoops with ring</p>
                    <button><Link to='/rings' className='view-more'>View more rings</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Feature