import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 
import './Login.css'
import Spinner from './Spinner'; 
import { useUserContext } from './UserContext';
import { FaUser, FaPhone, FaEyeSlash, FaEye } from "react-icons/fa"; 
import { Alert, Snackbar } from '@mui/material'; 
 
export default function LoginSignUp() { 
  const location = useLocation(); 
  const { loginUser } = useUserContext(); 
  const navigate = useNavigate(); 
 
  const [isRegistering, setIsRegistering] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
  const [userName, setUserName] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [number, setNumber] = useState(''); 
  const { user } = useUserContext(); 
 
  const [openAlert, setOpenAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState(""); 
  const [alertSeverity, setAlertSeverity] = useState("error"); 
 
  const usernameRegex = /^[a-zA-Z0-9]{4,}$/; 
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; 
 
  useEffect(() => { 
    if (user) { 
      navigate('/home'); 
    } 
  }, [user, navigate]); 
 
  useEffect(() => { 
    if (location.state && location.state.alertMessage) { 
      setAlertMessage(location.state.alertMessage); 
      setOpenAlert(true); 
      const timer = setTimeout(() => { 
        setOpenAlert(false); 
      }, 3000); 
      return () => clearTimeout(timer); 
    } 
  }, [location]); 
 
  const clearForm = () => { 
    setUserName(''); 
    setPassword(''); 
    setNumber(''); 
  }; 
 
  const validateRegisterForm = () => { 
    if (!usernameRegex.test(userName)) { 
      setAlertMessage("Username must be at least 4 characters and contain only letters or numbers."); 
      setAlertSeverity("error"); 
      setOpenAlert(true); 
      return false; 
    } 
    if (!passwordRegex.test(password)) { 
      setAlertMessage("Password must be at least 6 characters long and contain both letters and numbers."); 
      setAlertSeverity("error"); 
      setOpenAlert(true); 
      return false; 
    } 
    return true; 
  }; 
 
  const validateLoginForm = () => { 
    if (userName.trim() === "" || password.trim() === "") { 
      setAlertMessage("Please enter both username and password."); 
      setAlertSeverity("error"); 
      setOpenAlert(true); 
      return false; 
    } 
    return true; 
  }; 
 
 
  const registerHandler = async (event) => { 
    event.preventDefault(); 
    if (isLoading) return; 
    if (!validateRegisterForm()) return; 
 
    setIsLoading(true); 
    try { 
      let userInfo = { userName, password, number }; 
      const response = await fetch('https://arshia-resume-default-rtdb.firebaseio.com/users.json', { 
        method: 'POST', 
        body: JSON.stringify(userInfo) 
      }); 
      if (response.ok) { 
        setAlertMessage("Registration successful!"); 
        setAlertSeverity("success"); 
        setOpenAlert(true); 
        loginUser(userName); 
        navigate('/home'); 
      } else { 
        setAlertMessage("Registration failed. Please try again."); 
        setAlertSeverity("error"); 
        setOpenAlert(true); 
      } 
    } catch (error) { 
      setAlertMessage("An error occurred. Please try again."); 
      setAlertSeverity("error"); 
      setOpenAlert(true); 
    } finally { 
      setIsLoading(false); 
      clearForm(); 
    } 
  }; 
 
  const loginHandler = async (event) => { 
    event.preventDefault(); 
    if (isLoading) return; 
    if (!validateLoginForm()) return; 
 
    setIsLoading(true); 
    try { 
      const response = await fetch('https://arshia-resume-default-rtdb.firebaseio.com/users.json'); 
      const data = await response.json(); 
 
      let userFound = false; 
      for (let key in data) { 
        if (data[key].userName === userName && data[key].password === password) { 
          userFound = true; 
          setAlertMessage(`WelcomerName}!`); 
          setAlertSeverity("success"); 
          setOpenAlert(true); 
          loginUser(userName); 
          navigate('/home'); 
          break; 
        } 
      } 
 
      if (!userFound) { 
        setAlertMessage("User not found. Please register first."); 
        setAlertSeverity("error"); 
        setOpenAlert(true); 
      } 
    } catch (error) { 
      setAlertMessage("An error occurred. Please try again."); 
      setAlertSeverity("error"); 
      setOpenAlert(true); 
    } finally { 
      setIsLoading(false); 
      clearForm(); 
    } 
  }; 
 
  const handleRegisterClick = () => { 
    setIsRegistering(true); 
    clearForm(); 
  }; 
 
  const handleLoginClick = () => { 
    setIsRegistering(false); 
    clearForm(); 
  }; 
 
  const togglePasswordVisibility = () => { 
    setIsPasswordVisible(!isPasswordVisible); 
  }; 
 
  return ( 
    <div className='register-body'> 
      <div className={`wrapper ${isRegistering ? 'active' : ''}`}> 
        <Snackbar open={openAlert} autoHideDuration={3000}> 
          <Alert severity="error">{alertMessage}</Alert> 
        </Snackbar> 
        <span className='bg-animate'></span> 
        <span className='bg-animate2'></span> 
 
        {/* Login Form */} 
        <div className={`form-box login ${isRegistering ? '' : 'active'}`}> 
          <h2 className='animation' style={{ "--i": 0, "--j": 21 }}>Login</h2> 
          <form onSubmit={loginHandler}> 
            <div className='input-box animation' style={{ "--i": 1, "--j": 22 }}> 
              <input 
                type="text" 
                required 
                value={userName} 
                onChange={(event) => setUserName(event.target.value)} 
              /> 
              <label>Username</label> 
              <i><FaUser className='icon' /></i> 
            </div> 
            <div className='input-box animation' style={{ "--i": 2, "--j": 23 }}> 
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                required 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
              /> 
              <label>Password</label> 
              <i> 
                {isPasswordVisible ? ( 
                  <FaEye className='hiddenShow icon' onClick={togglePasswordVisibility} /> 
                ) : ( 
                  <FaEyeSlash className='hiddenShow icon' onClick={togglePasswordVisibility} /> 
                )} 
              </i> 
            </div> 
            <button 
              type='submit' 
              className='form-btn animation' 
              style={{ "--i": 3, "--j": 24 }} 
              disabled={isLoading} 
            > 
              {isLoading ? <Spinner /> : "Login"} 
            </button> 
            <div className="logreg-link animation" style={{ "--i": 4, "--j": 25 }}> 
              <p>Don't have an account? 
                <a href="#" onClick={handleRegisterClick} className='register-link'>Sign Up</a> 
              </p> 
            </div> 
          </form> 
        </div> 
 
        {/* Info Text for Login */} 
        <div className="info-text login"> 
          <h2 className='animation' style={{ "--i": 0, "--j": 20 }}>Welcome Back!</h2> 
          <p className='animation' style={{ "--i": 1, "--j": 21 }}>Login to explore a world of vaping and pod experiences.</p> 
        </div> 
 
        {/* Register Form */} 
        <div className={`form-box register ${isRegistering ? 'active' : ''}`}> 
          <h2 className='animation signupinfo' style={{ "--i": 17, "--j": 1 }}>Sign Up</h2> 
          <form onSubmit={registerHandler}> 
            <div className='input-box animation' style={{ "--i": 18, "--j": 2 }}> 
              <input 
                type="text" 
                required 
                value={userName} 
                onChange={(event) => setUserName(event.target.value)} 
              /> 
              <label>Username</label> 
              <i><FaUser className='icon' /></i> 
            </div> 
            <div className='input-box animation'style={{ "--i": 19, "--j": 3 }}> 
              <input 
                type={isPasswordVisible ? "text" : "password"} 
                required 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
              /> 
              <label>Password</label> 
              <i> 
                {isPasswordVisible ? ( 
                  <FaEye className='hiddenShow icon' onClick={togglePasswordVisibility} /> 
                ) : ( 
                  <FaEyeSlash className='hiddenShow icon' onClick={togglePasswordVisibility} /> 
                )} 
              </i> 
            </div> 
            <div className='input-box animation' style={{ "--i": 20, "--j": 4 }}> 
              <input 
                type="number" 
                required 
                value={number} 
                onChange={(event) => setNumber(event.target.value)} 
              /> 
              <label>Number</label> 
              <i><FaPhone className='icon' /></i> 
            </div> 
            <button 
              type='submit' 
              className='form-btn animation' 
              style={{ "--i": 21 }} 
              disabled={isLoading} 
            > 
              {isLoading ? <Spinner /> : "Sign Up"} 
            </button> 
            <div className="logreg-link animation" style={{ "--i": 22, "--j": 1 }}> 
              <p>Already have an account? 
                <a href="#" onClick={handleLoginClick} className='login-link'>Login</a> 
              </p> 
            </div> 
          </form> 
        </div> 
 
        {/* Info Text for Register */} 
        <div className="info-text register"> 
          <h2 className='animation' style={{ "--i": 17, "--j": 0 }}>Join Us Today!</h2> 
          <p className='animation' style={{ "--i": 18, "--j": 1 }}>Sign up to discover new flavors and exclusive offers in the vaping world!</p> 
        </div> 
      </div> 
       
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}> 
        <Alert onClose={() => setOpenAlert(false)} severity={alertSeverity}> 
          {alertMessage} 
        </Alert> 
      </Snackbar> 
    </div> 
  ); 
}