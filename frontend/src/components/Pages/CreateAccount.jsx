import React, { useState } from 'react'
import './CSS/CreateAccount.css'

const CreateAccount = () => {

    const[formData,setFormData] = useState({
        fname:"",
        lname:"",
        username:"",
        email:"",
        password:"",
        confirm_password:"",
    })

    const comparePass = async () => {
        if (formData.password !== formData.confirm_password) {
            // Passwords don't match, show an alert
            alert('Passwords do not match');
            return;
        }
    }

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const createAccount = async (req, res) => {
        comparePass();
        console.log("signed up", formData);
    
        let responseData;
        await fetch('http://localhost:8800/register', {
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
            alert('Registration failed. Please check your information and try again.');
        }
    };


    return(
        <div className='create-account'>
            <div className="register">
                <div className="container">
                    <h3>Create an account</h3>
                    <p>Please provide your essential details for Manawari's registration form to unlock a world of opportunities and personalized experiences tailored just for you.</p>
                    <form action="">
                        <input name='fname' value={formData.fname} onChange={changeHandler} type="text" placeholder="First Name" />
                        <input name='lname' value={formData.lname} onChange={changeHandler} type="text" placeholder="Last Name" />
                        <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Username"/>
                        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email" />
                        <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
                        <input name='confirm_password' value={formData.confirm_password} onChange={changeHandler}type="password" placeholder="Confirm Password" />
                        <button onClick={()=>{createAccount()}}  type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount