import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Delete the jwtToken cookie

    Cookies.remove("jwtToken");

    // Redirect the user to the login page
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
