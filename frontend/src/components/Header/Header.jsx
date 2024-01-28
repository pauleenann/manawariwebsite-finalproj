import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <div className="header">
            <div className="banner-contents">
                    <span className="tagline">Adorn Your Dreams with Elegance</span>
                    <Link to='/rings'><button className='discover'>DISCOVER OUR COLLECTION</button></Link>
                    
            </div>
        </div>
    )
}

export default Header