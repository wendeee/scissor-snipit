import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const Dashboard = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isButtonClicked) {
      navigate("/dashboard/create");
    }
  }, [navigate, isButtonClicked]);

  const handleCreateLinkClick = () => {
    setIsButtonClicked(true);
  };
  return (
    <div className="dashboard-container">
      <NavBar isLoggedIn={true} />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <h1>Welcome, User</h1>
          {/* <img src={dashboardImage} alt="" /> */}
          <button
            type="button"
            className="create-link-btn"
            onClick={handleCreateLinkClick}
          >
            Create a link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
