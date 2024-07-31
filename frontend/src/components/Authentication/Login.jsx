import "./styles.css";
import loginImg from "./images/login-image.png";
import googleIcon from "./images/search.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Login({ refreshNavBar }) {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [invalidUsernameError, setInvalidUsernameError] = useState("");
  const [invalidPasswordError, setInvalidPasswordError] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    // to prevent from screen getting refreshed
    event.preventDefault();

    try {
      // call Login api
      const loginRequestBody = {
        email: inputUsername,
        password: inputPassword,
      };
      const loginResponse = await axios.post(
        "http://localhost:8080/login",
        loginRequestBody
      );
      console.log(loginResponse);
      // Save data to local storage
      const { token, email, role, id } = loginResponse.data;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", id);
      refreshNavBar(); // Call the function to refresh the NavBar
      navigate("/");
    } catch (error) {
      const errorMessage = error.response.data.toLowerCase();
      console.error("Error during login:", errorMessage);
      if (errorMessage === "user is not registered") {
        setInvalidUsernameError("User does not exist, please signup!");
        setInvalidPasswordError("");
      } else if (errorMessage === "incorrect password") {
        setInvalidUsernameError("");
        setInvalidPasswordError("Password is incorrect");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const handleGoogleLoginBtnClick = (event) => {
    event.preventDefault();
    alert(
      "User can login with their google account. Click okay to simulate google login ane be directed to user profile."
    );
    navigate("/dashboard");
  };

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
              <form className="login-form" onSubmit={handleFormSubmit}>
                {/* Username input field */}
                <div>
                  {invalidUsernameError && (
                    <div className="error-message">{invalidUsernameError}</div>
                  )}
                </div>
                <div className="form-input">
                  <input
                    type="email"
                    name="username"
                    placeholder="Enter Email"
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-input">
                  <div>
                    {invalidPasswordError && (
                      <div className="error-message">
                        {invalidPasswordError}
                      </div>
                    )}
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="forgot-password">
                  <Link to="/resetPassword" className="nav-link">
                    {" "}
                    Forgot Password?{" "}
                  </Link>
                </div>
                <div className="form-input">
                  <input className="login-btn" type="submit" value="LOGIN" />
                </div>
              </form>
              <div className="divider">
                <span className="divider-text">or</span>
              </div>
              <button
                className="google-login-btn"
                onClick={handleGoogleLoginBtnClick}
              >
                <img
                  src={googleIcon}
                  alt="Google icon"
                  className="google-icon"
                />
                <span>Login with Google</span>
              </button>
              <div className="create-account">
                <p>
                  Dont have an account? Click{" "}
                  <Link to="/signup" className="nav-link">
                    {" "}
                    <span>here</span>{" "}
                  </Link>{" "}
                  to SIGN UP!{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
