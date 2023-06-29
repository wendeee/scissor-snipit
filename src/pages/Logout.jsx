import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Delete the jwtToken cookie
    const jwtTokenCookie = Cookies.get("jwtToken");
    // Cookies.remove("jwtToken");
    console.log(jwtTokenCookie);

    // Redirect the user to the login page
    // navigate("/");
  }, []);

  //   return null;
};

export default Logout;
