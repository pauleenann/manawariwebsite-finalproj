import React from 'react'
import Header from '../Components/Header/Header'
import Collage from '../Components/Collage/Collage'
import AboutUs from '../Components/About-us-Banner.jsx/AboutUs'
import Feature from '../Components/Feature/Feature'
import Footer from '../Components/Footer/Footer'


const Homepage = () => {
    return(
        <div>
            <Header></Header>
            <Collage></Collage>
            <AboutUs></AboutUs>
            <Feature></Feature>
        </div>
    )
}

export default Homepage