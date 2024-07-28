import './styles.css';
import loginImg from './images/login-image.png';
import googleIcon from './images/search.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function Signup(){
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputPassword, setInputPassword] =  useState('');
    const [inputConfirmPassword, setInputConfirmPassword] =  useState('');
    const [invalidUsernameError, setInvalidUsernameError] = useState('');
    const [invalidPasswordError, setInvalidPasswordError] = useState('');

    // Dummy values for login
    const testUsername = "vvinod@dal.ca";
    const testPassword = "csci5709";

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        // // to prevent from screen getting refreshed
        event.preventDefault();
        setInvalidUsernameError('');
        if(inputEmail !== testUsername){
            setInvalidUsernameError('Username does not exist');
            return;
        } else if(inputPassword !== testPassword){
            setInvalidPasswordError('Password is incorrect')
        } else {
            navigate("/")
        }
    }

    const handleGoogleLoginBtnClick = (event) => {
        event.preventDefault();
        alert("User can login with their google account. Click okay to simulate google login ane be directed to user profile.")
        navigate("/dashboard")
    };

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="p-3 img-col">
                            <img src={loginImg} alt="Event stall" id="login-img" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="p-3 login-form-container">
                            <form className="login-form" onSubmit={handleFormSubmit}>
                                {/* Username input field */}
                                <div className="form-input">
                                    <input 
                                        type="text" 
                                        name="firstname" 
                                        placeholder='Enter First Name' 
                                        value={inputFirstName}
                                        onChange={(e) => setInputFirstName(e.target.value)} 
                                        required/>
                                </div>
                                <div className="form-input">
                                    <input 
                                        type="text" 
                                        name="lastname" 
                                        placeholder='Enter Last Name' 
                                        value={inputLastName}
                                        onChange={(e) => setInputLastName(e.target.value)} 
                                        required/>
                                </div>
                                <div>{invalidUsernameError && <div className="error-message">{invalidUsernameError}</div>}</div>
                                <div className="form-input">
                                    <input 
                                        type="email" 
                                        name="username" 
                                        placeholder='Enter Email' 
                                        value={inputEmail}
                                        onChange={(e) => setInputEmail(e.target.value)} 
                                        required/>
                                </div>
                                <div className="form-input">
                                    <input 
                                        type="tel" 
                                        name="phone" 
                                        placeholder='Enter Phone Number' 
                                        value={inputPhoneNumber}
                                        onChange={(e) => setInputPhoneNumber(e.target.value)} 
                                        required/>
                                </div>
                                <div className="form-input">
                                    <div>{invalidPasswordError && <div className="error-message">{invalidPasswordError}</div>}</div>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        placeholder='Enter Password' 
                                        value={inputPassword}
                                        onChange={(e) => setInputPassword(e.target.value)} 
                                        required/>
                                </div>
                                <div className="form-input">
                                    <div>{invalidPasswordError && <div className="error-message">{invalidPasswordError}</div>}</div>
                                    <input 
                                        type="password" 
                                        name="confirmpassword" 
                                        placeholder='Confirm Password' 
                                        value={inputConfirmPassword}
                                        onChange={(e) => setInputConfirmPassword(e.target.value)} 
                                        required/>
                                </div>
                                <div className="form-input">
                                    <input className='login-btn' type="submit" value="SIGN UP" />
                                </div>
                            </form>
                            <div className="divider">
                                <span className="divider-text">or</span>
                            </div>
                            <button className="google-login-btn" onClick={handleGoogleLoginBtnClick}>
                                <img src={googleIcon} alt="Google icon" className="google-icon" />
                                Signup with Google
                            </button>
                            <div className="create-account">
                                <p>Already have an account? Click <Link to="/login" className="nav-link"> <span>here</span> </Link> to LOGIN! </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;