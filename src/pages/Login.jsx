import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Cookies from "js-cookie";
// import NavBar from "../components/NavBar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  // const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

  //setUseEffect here

  useEffect(() => {
    if (isButtonClicked) {
      const fetchData = async () => {
        setIsLoading(true); // Set loading state to true

        try {
          const response = await fetch(
            "http://localhost:3001/api/v1/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (!response.ok) {
            const errorResponse = await response.json();
            setResponseMessage(`Error: ${errorResponse.message}`);
          } else {
            const data = await response.json();
            console.log(data);
            if (data.status === 200) {
              //set cookies
              const { token } = data.data.jwtToken;
              const expirationTime = new Date();
              expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000); // Set expiration time to 1 hour from now
              Cookies.set("jwtToken", token, { expires: expirationTime });
            }
            navigate("/dashboard");
            // setResponseMessage(`${data.data.modifiedResponse}`);
          }

          //   if (data.status === 200) {
          //     //set cookies
          //     // const { token } = data.data.jwtToken;
          //     // console.log(data.data.modifiedResponse.firstName);
          //     // const { firstName } = data.data.modifiedResponse.firstName;
          //     // console.log("TOKEN:", token);
          //     const expirationTime = new Date();
          //     expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000); // Set expiration time to 1 hour from now
          //     // Cookies.set("jwtToken", token, { expires: expirationTime });

          //     // navigate("/dashboard", { state: { firstName } });
          //   } else {
          //     console.log(data);
          //   }
        } catch (error) {
          console.log(error);
        }

        setIsLoading(false); // Set loading state to false after request completion
      };

      fetchData();
    }
  }, [email, password, navigate, isButtonClicked]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
      <div className="login-page flex items-center justify-center  mt-10 mb-10 h-screen mx-auto">
        <form className="login-form">
          <h1 className="block mb-8 font-bold">Welcome Back</h1>
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
          <button
            type="button"
            className="login-btn secondary-button"
            onClick={handleLoginClick}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <div className="login-form-paragraph">
            <p className="forgot-password-text">
              <a href="/forgot-password">Forgot Password?</a>
            </p>
            <p className="signup-text">
              <a href="/signup">Don't have an account? Sign up</a>
            </p>
          </div>
        </form>
        {/* {responseMessage && <p>{responseMessage}</p>} */}
      </div>
    </>
  );
};

export default Login;
