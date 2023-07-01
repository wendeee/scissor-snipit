import React from "react";
import { useState, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

// import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  //eslint-disable-next-line
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();
  const baseURL = `https://snipit.onrender.com`;

  //setUseEffect here

  useEffect(() => {
    if (isButtonClicked) {
      const fetchData = async () => {
        setIsLoading(true); // Set loading state to true

        try {
          const response = await fetch(`${baseURL}/api/v1/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, confirmPassword }),
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            setResponseMessage(`Error: ${errorResponse.message}`);
          } else {
            const data = await response.json();

            console.log("DATA: ", data);

            navigate("/login");
          }
        } catch (error) {
          console.log(error);
        }

        setIsLoading(false);
      };

      fetchData();
    }
  }, [
    name,
    email,
    password,
    confirmPassword,
    navigate,
    isButtonClicked,
    baseURL,
  ]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleLoginClick = () => {
    setIsButtonClicked(true);
  };
  //   async function login() {
  //     const response = await fetch(
  //       "https://snipit.onrender.com/api/v1/auth/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       }
  //     );
  //     const data = await response.json();
  //     // Handle the response data here
  //     // console.log(data.status);
  //     if (data.status === 200) {
  //       // Redirect to the dashboard
  //       navigate("/dashboard");
  //     } else {
  //       // Handle unsuccessful login
  //       // ...
  //       console.log(data);
  //     }
  //   }
  return (
    <>
      {/* <NavBar /> */}
      <div className="login-page sign-up flex items-center justify-center  mt-10 mb-10 h-screen mx-auto">
        <form className="login-form signup-form">
          <h1 className="block mb-8 font-bold">Create your account</h1>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full"
            />
          </label>
          <br />

          <label>
            Email address:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full"
            />
          </label>
          <br />
          <label>
            Password:
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={handleTogglePassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </button>
            </div>
          </label>
          <br />
          <label>
            Confirm password:
            <div className="password-field">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? (
                  <VisibilityIcon />
                ) : (
                  <VisibilityOffIcon />
                )}
              </button>
            </div>
          </label>
          <br />
          <button
            type="button"
            className="login-btn secondary-button"
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
          <div className="login-form-paragraph">
            <p className="signup-text">
              <a href="/login">Already have an account? Log in</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
