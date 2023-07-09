import "./Signup.css"
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import iphone from "../../Images/iphone.png"

export function Signup(){
    const navigate = useNavigate()
    const[error, setError] = useState(false)
    const[showPassword, setShowPassword] = useState(false)
    const[confirmshowPassword, setconfirmShowPassword] = useState(false)
    const[confirmPswrd, setConfirmPswrd] = useState('')
    const[singUpValues, setSignUpValues] = useState({displayName:"", Email:"", Pswrd:""})
    const[isButtonDisabled, setIsButtonDisabled] = useState(false)

    setTimeout(() => {
      setIsButtonDisabled(singUpValues.displayName === '' && singUpValues.Email === '' && singUpValues.Pswrd === '' && singUpValues.Pswrd.toLowerCase() === confirmPswrd.toLowerCase())
    }, 2000);
    

    const handleChange = (key, value) => {
        setSignUpValues(prevState => ({
          ...prevState,
          [key]: value
        }));
      };


    const handleCreate = (e) =>{
        navigate("/UserCreation", {state:{singUpValues}})
    }
    

    const showPasswordvisible = () => {
        setShowPassword(!showPassword)
    }

    const confirmShowpswrdVisible = () => {
        setconfirmShowPassword(!confirmshowPassword)
    }

  
    console.log(isButtonDisabled)


    return(
        <>
        <div className="signUp">
            <div className="singuplogo">
                <img className="iphone" src="https://www.biophysics.org/Portals/0/EasyDNNnews/10400/img-social-media-5187243_1920.png" alt="bg"/>
                <div className="singupInfo">
                    <h1>Socialo</h1>
                    <p><strong>Are You a social person!!! Then your in a right place</strong></p>
                    <p><strong>Go Ahead!! SignUp and share your thoughts!!!</strong></p>
                </div>
            </div>
            <div className="signupForm">
                <h1>Sign Up</h1>
                <div className="formLoginData">
                    <div className="image-line">
                    </div>
                    <div >
                        <div>
                            <label>Enter Your Name*</label>
                            <input type="text" placeholder="UserName" required  onChange={(e) => handleChange('displayName', e.target.value)} style={{border: singUpValues.displayName === '' ? "2px solid #DE3163" : "" }}/><span class="material-symbols-outlined" style={{ top:"-27px",left:"220px"}}>account_circle</span>
                        </div>
                        <div>
                            <label>Enter Your Email*</label>
                            <input type="text" placeholder="test@gmail.com" required  onChange={(e) => handleChange('Email', e.target.value)} style={{border: singUpValues.Email === '' ? "2px solid #DE3163" : "" }}/><span class="material-symbols-outlined" style={{ top:"-27px",left:"220px"}}>drafts</span>
                        </div>
                        <div>
                            <label>Enter Your Password*</label>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" minLength={6} required onChange={(e) => handleChange('Pswrd', e.target.value)} style={{border: singUpValues.Pswrd === '' ? "2px solid #DE3163" : "" }}/><span class="material-symbols-outlined" style={{top:"-27px", left:"220px"}} onClick={()=>showPasswordvisible()}>{showPassword ? 'visibility_off' :'visibility'}</span> 
                        </div>
                        <div>
                            <label>Confirm Password Again*</label>
                            <input type={confirmshowPassword ? 'text' : 'password'} placeholder="Confirm Password" required onChange={(e)=> setConfirmPswrd(e.target.value)} /><span class="material-symbols-outlined" style={{top:"-27px", left:"220px"}} onClick={()=>confirmShowpswrdVisible()}>{confirmshowPassword ? 'visibility_off' :'visibility'}</span> 
                        </div>
                        <button style={{marginLeft:"40px"}} value="Sign Up" disabled={isButtonDisabled} onClick={handleCreate}>Create a New Account</button>
                        {isButtonDisabled && <p className="formerror">Please fill or check the above fields</p> }
                        <p style={{marginLeft:"30px", marginTop:"20px"}}>Already have an Account<Link to="/login" className="signInLink">  Sign In</Link></p>
                    </div>
                        {error && <span className="error" style={{color:"red"}}>Something went wrong</span>}
                </div>
            </div>
        </div>
        </>
    )
}