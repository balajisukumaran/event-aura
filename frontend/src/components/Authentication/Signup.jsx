import './styles.css';
import loginImg from './images/login-image.png';
import googleIcon from './images/search.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';

function Signup(){
    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhoneNumber, setInputPhoneNumber] = useState('');
    const [inputPassword, setInputPassword] =  useState('');
    const [inputConfirmPassword, setInputConfirmPassword] =  useState('');
    const [invalidUsernameError, setInvalidUsernameError] = useState('');
    const [invalidPasswordError, setInvalidPasswordError] = useState('');
    const [invalidPhoneNumberError, setInvalidPhoneNumberError] = useState('');

    const navigate = useNavigate();

    const validatePhoneNumber = () => {
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(inputPhoneNumber);
    };

    const validatePasswordLength = () => {
        return inputPassword.length >= 8;
    };

    const handleFormSubmit = async (event) => {
        // // to prevent from screen getting refreshed
        event.preventDefault();
        setInvalidUsernameError('');
        setInvalidPhoneNumberError('');
        setInvalidPasswordError('');

        // Invalid phone number check
        if (!validatePhoneNumber()) {
            setInvalidPhoneNumberError('Must be a valid phone number');
            return;
        }

        // Password length check
        if (!validatePasswordLength()) {
            setInvalidPasswordError('Password must be at least 8 characters long');
            return;
        }

        // Password match check
        if(inputPassword !== inputConfirmPassword){
            setInvalidPasswordError('Passwords do not match');
            return;
        }

        try{
            const signupRequestBody =  {
                firstname: inputFirstName,
                lastname: inputLastName,
                email: inputEmail,
                phone: inputPhoneNumber,
                password: inputPassword,
                role: "ATTENDEE"
            }

            const signupResponse = await axios.post('http://localhost:8080/signup', signupRequestBody);
            // Save data to local storage
            const { token, email, role } = signupResponse.data;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('role', role);
            navigate("/");

        } catch (error){
            const errorMessage = error.response.data.toLowerCase();
            console.error('Error during login:', errorMessage);
            if(errorMessage === "user exists"){
                alert("User already exists, please login!");
                navigate("/login");
            } else {
                alert('An error occurred. Please try again.');
            }
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
                                <div>{invalidPhoneNumberError && <div className="error-message">{invalidPhoneNumberError}</div>}</div>
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