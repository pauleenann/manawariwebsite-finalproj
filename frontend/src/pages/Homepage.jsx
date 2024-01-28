import React from 'react'
import Header from '../components/Header/Header'
import Collage from '../components/Collage/Collage'
import AboutUs from '../components/About-us-Banner.jsx/AboutUs'
import Feature from '../components/Feature/Feature'


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