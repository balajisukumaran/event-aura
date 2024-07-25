import './styles.css';
import loginImg from './images/login-image.png';
import googleIcon from './images/search.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function ResetPassword(){
    const [inputEmail, setEmail] = useState('');
    const [invalidUsernameError, setInvalidUsernameError] = useState('');

    // Dummy values for login
    const testUsername = "vvinod@dal.ca";
    const testPassword = "csci5709";

    const navigate = useNavigate();

    const handleFormSubmit = (event) => {
        // to prevent from screen getting refreshed
        event.preventDefault();
        setInvalidUsernameError('');
        if(inputEmail !== testUsername){
            setInvalidUsernameError('Username does not exist');
            return;
        } else {
            navigate("/dashboard")
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
                                <div>{invalidUsernameError && <div className="error-message">{invalidUsernameError}</div>}</div>
                                <div className="form-input">
                                    <input 
                                        type="email" 
                                        name="username" 
                                        placeholder='Enter Username' 
                                        value={inputEmail}
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required/>
                                </div>
                                <div className="form-input">
                                    <input className='login-btn' type="submit" value="RESET" />
                                </div>
                            </form>
                            <div className="divider">
                                <span className="divider-text">or</span>
                            </div>
                            <button className="google-login-btn" onClick={handleGoogleLoginBtnClick}>
                                <img src={googleIcon} alt="Google icon" className="google-icon" />
                                Login with Google
                            </button>
                            <div className="create-account">
                                <p>Dont have an account? Click <Link to="/signup" className="nav-link"> <span>here</span> </Link> to SIGN UP! </p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;