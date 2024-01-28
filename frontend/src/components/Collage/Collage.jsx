import React from 'react'
import './Collage.css'

const Collage = () => {
    return(
        <div className="collage">
            <div class="container">
                <div class="column-1">
                    <div class="img1"></div>
                </div>
                <div class="column-2">
                    <div class="row1">
                        <div class="img2"></div>
                        <div class="img3"></div>
                    </div>
                    <div class="row2">
                        <div class="img4"></div>
                        <div class="img5"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collage