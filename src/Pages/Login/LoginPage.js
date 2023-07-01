import "./LoginPage.css"
import { Link } from "react-router-dom"
import { useLocation, useNavigate } from "react-router-dom";
import { UseAuth } from "../../Context/AuthContext";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";



export function LoginPage(){
  const {setCredentials, email, setMail, setPassword, password, isAuth, setAuth,data, username, setUsername} = UseAuth()
  const navigate = useNavigate();
  const location = useLocation();
  const[confirmshowPassword, setconfirmShowPassword] = useState(false)
  const[error, setError] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()

        const email = e.target[0].value
        const password = e.target[1].value

        try{
             await signInWithEmailAndPassword(auth, email, password)
             navigate("/HomePage") 
            }
            catch(error){
                setError(true)
            }   
        }


//   const handleClick = (e) => {
//     setCredentials(e);
//     if (isAuth) navigate(location?.state?.from?.pathname)
//   };

const confirmShowpswrdVisible = () => {
    setconfirmShowPassword(!confirmshowPassword)
}
  
    return(
        <>
        <div className="loginPage">
            <div className="logoset">
                    <div className="loginInfo">
                        <h1>Socialo</h1>
                        <p><strong>See what's happening in the world right now!!!</strong></p>
                    </div>
                <img src="https://www.nicepng.com/png/detail/270-2701879_icone-communication-background-technology-social-media.png" alt="loginImg"/>
            </div>
            {isAuth ? navigate("/HomePage") : (
            <div className="loginCard">
                <h1 style={{color:"#14B0AD", marginLeft:"-2rem"}}>User Login</h1>
                <div className="LoginData">
                <form onSubmit={handleLogin}>
                    <div>
                        <label> Enter Your Email Address *</label>
                       <input style={{width:"250px"}} type="text" placeholder="adarshbalika@gmail.com" name="Email" value={email} /> <span class="material-symbols-outlined" style={{ top:"-27px",left:"220px"}}>account_circle</span>
                    </div>
                    <div>
                        <label> Enter Your Password *</label>
                        <input type={confirmshowPassword ? 'text' : 'password'} className="pwd" placeholder="********" name="password" value={password} /><span class="material-symbols-outlined" style={{top:"-27px", left:"220px"}} onClick={()=>confirmShowpswrdVisible()}>{confirmshowPassword ? 'visibility_off' :'visibility'}</span> 
                    </div>
                    <button type="submit" value="Sign In" className="btn primary" >Sign In</button>
                    {/* <button type="submit" value="Test User" className="btn primary" >Login With Test Credentials</button> */}
                    
                    <p style={{marginLeft:"10px", color:"black", padding:"15px"}}>Don't have an Account?<Link to="/SignUp" style={{color:"#14B0AD"}}>  Sign Up</Link></p>
                    {error && <span>Something went wrong</span>}
                </form>
                </div>
            </div>
            )}
        </div>
        </>
    )
}