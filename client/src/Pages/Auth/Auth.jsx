import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Auth.css';
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth' 

const Auth = () => {

    const [isSignup, setIsSignup] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () => {
        setIsSignup(!isSignup)
        setName('')
        setEmail('')
        setPassword('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!email && !password){
            alert('Enter email and password')
        }

        if(isSignup){
            if(!name){
                alert("Enter a name to continue")
            }
            dispatch(signup({ name, email, password }, navigate))
        }else{
            dispatch(login({ email, password }, navigate))
        }
    }

  return (
    <section className='auth-section'>
        { isSignup && <AboutAuth/>}
        <div className="auth-container-2">
            {!isSignup && <img src={icon} alt='devqueries' className='login-logout'/>}
            <form onSubmit={handleSubmit}>
                {
                    isSignup && (
                        <label htmlFor='name'>
                            <h4>Name</h4>
                            <input type='text' id='name' name='name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                        
                        </label>
                    )
                }
                <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" name="name" id='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="password">
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <h4>Password</h4>
                    { !isSignup &&
                    <p style={{color: "#007ac6"}}>forgot password?</p>}
                    </div>
                    <input type="password" name="password" id='password' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    {isSignup && <p>Password must contain at least eight<br/>characters, including at least 1 letter<br/>and 1 number.</p>}
                </label>
                { isSignup && ( 
                <label htmlFor='check'>
                    <input type="checkbox" id='check'/>
                    <p>
                        {/* Check this for product updates. */}
                        Acknowledgement
                        </p>
                </label>
                )}
                <button type='submit' className='auth-btn'>{isSignup ? 'Sign Up' : 'Log in'}</button>
                { isSignup && (
                    <p>
                        By clicking "Sign Up", you agree<br/>to our 
                        <span style={{color: "#007ac6"}}> terms of service</span>,  
                        <span style={{color: "#007ac6"}}> privacy policy</span> and 
                        <span style={{color: "#007ac6"}}> cookie policy</span>
                    </p>
                )}
            </form>
            <p>
                {isSignup ? 'already have an account?' : "Don't have an account?"}
                <button type="button" className="handle-switch-btn" onClick={handleSwitch}>{isSignup ? "Log in" : "Sign up"}</button>
            </p>
        </div>
    </section>
    

  )
}

export default Auth