import React, { useState } from 'react'
import './CSS/Signin.css'
import { Link } from 'react-router-dom'

const Signin = () => {


    const[formData,setFormData] = useState({
        email:"",
        password:""
    })

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const signIn = async(req, res)=>{
        console.log("logged in",formData)

        let responseData;
        await fetch('http://localhost:8800/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(formData),
        })
            .then((resp) => resp.json())
            .then((data) => (responseData = data));
    
        // Check
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert('Wrong email of password. Please try again.');
        }
    }
    return(
        <div className="signin-create">
            <div className="container">
            <div className="sign-in">
                <h3>Sign in</h3>
                <p>Sign in to your Manawari account</p>
                <form action="">
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email" />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                    <button onClick={()=>{signIn()}}>Sign in</button>
                    <a href="">Forgot your password?</a>
                </form>
            </div>
            <div className="create">
                <h3>Create an account</h3>
                <p>
                    Get started with Manawari by creating your account —
                    your gateway to exclusive features, personalized content,
                    and a seamless experience tailored to your needs.
                </p>
                <Link to={'/create-account'}><button>Register</button></Link>
            </div>
        </div>
        </div>
    )
}

export default Signin