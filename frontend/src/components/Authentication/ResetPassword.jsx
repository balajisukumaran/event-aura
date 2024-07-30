import './styles.css';
import loginImg from './images/login-image.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import generateToken from './GenerateResetToken';

function ResetPassword(){

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidToken, setIsValidToken] = useState(false);
    const [inputEmail, setEmail] = useState('');
    const [inputToken, setInputToken] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');
    const [invalidEmailError, setInvalidEmailError] = useState('');
    const [invalidPasswordError, setInvalidPasswordError] = useState('');
    const [invalidTokenError, setInvalidTokenError] = useState('');

    const navigate = useNavigate();

    const validatePasswordLength = () => {
        return inputPassword.length >= 8;
    };

    const handleFormSubmit = async (event) => {
        // to prevent from screen getting refreshed
        event.preventDefault();
        try{

            const token =  generateToken(6);
            setResetToken(token);
            
            const resetRequestBody =  {
                email: inputEmail,
                resetToken: token
            }
            const resetResponse = await axios.post('http://localhost:8080/resetPassword', resetRequestBody);
            setIsValidEmail(resetResponse.data);

        } catch (error){
            const errorMessage = error.response.data.toLowerCase();
            console.error('Error during login:', errorMessage);
            if(errorMessage === "user not found"){
                setInvalidEmailError("Email does not exist, please try again!");
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    }

    const handleTokenInput = (event) => {
        event.preventDefault();
        if (inputToken === resetToken) {
            setIsValidEmail(false);
            setIsValidToken(true);
        } else {
            setInvalidTokenError('Invalid token. Please try again.');
        }
    }

    const handleResetPassword = async (event) => {
        event.preventDefault();

        // Password length check
        if (!validatePasswordLength()) {
            setInvalidPasswordError('Password must be at least 8 characters long');
            return;
        }

        // Password match check
        if (inputPassword !== inputConfirmPassword) {
            setInvalidPasswordError('Passwords do not match');
            return;
        }
        try {
            const resetPasswordBody = {
                email: inputEmail,
                password: inputPassword
            };
            await axios.post('http://localhost:8080/updatePassword', resetPasswordBody);
            alert('Password has been reset successfully');
            navigate("/login");
        } catch (error) {
            alert('An error occurred. Please try again.');
        }
    }

    return (
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
                            {!isValidEmail && !isValidToken && (
                                <form className="login-form" onSubmit={handleFormSubmit}>
                                    <div>{invalidEmailError && <div className="error-message">{invalidEmailError}</div>}</div>
                                    <div className="form-input">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder='Enter Email'
                                            value={inputEmail}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-input">
                                        <input className='login-btn' type="submit" value="RESET" />
                                    </div>
                                </form>
                            )}
                            {isValidEmail && !isValidToken && (
                                <form className="login-form" onSubmit={handleTokenInput}>
                                    <div>{invalidTokenError && <div className="error-message">{invalidTokenError}</div>}</div>
                                    <div className="form-input">
                                        <input
                                            type="text"
                                            name="token"
                                            placeholder='Enter Token'
                                            value={inputToken}
                                            onChange={(e) => setInputToken(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-input">
                                        <input className='login-btn' type="submit" value="SUBMIT" />
                                    </div>
                                </form>
                            )}
                            {isValidToken && (
                                <form className="login-form" onSubmit={handleResetPassword}>
                                    <div className="form-input">
                                        <div>{invalidPasswordError && <div className="error-message">{invalidPasswordError}</div>}</div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder='Enter Password'
                                            value={inputPassword}
                                            onChange={(e) => setInputPassword(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-input">
                                        <input
                                            type="password"
                                            name="confirmpassword"
                                            placeholder='Confirm Password'
                                            value={inputConfirmPassword}
                                            onChange={(e) => setInputConfirmPassword(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-input">
                                        <input className='login-btn' type="submit" value="RESET" />
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;