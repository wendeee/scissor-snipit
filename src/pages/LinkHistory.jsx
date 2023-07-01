import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import LinkHistoryDetails from "../components/LinkHistoryDetails";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const LinkHistory = () => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const baseURL = `https://snipit.onrender.com`;
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        const response = await fetch(`${baseURL}/api/v1/url/history`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Handle server error response
          const errorResponse = await response.json();
          console.log("Server Error Response:", errorResponse);
          if (errorResponse.status === 401) {
            alert("Session expired!!! Please login");
            navigate("/");
          }
          setResponseMessage(`Error: ${errorResponse.message}`);
        } else {
          console.log("RESPONSE:", response);
          // Handle successful response
          const data = await response.json();
          if (data.status === 200) {
            setData(data.data.generatedShortUrl);
            console.log("DATA:", data.data.generatedShortUrl);
          }
        }
      } catch (err) {}
    };
    fetchData();
  }, [navigate, baseURL]);
  return (
    <div className="dashboard-container">
      <NavBar isLoggedIn={true} />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <h2 className="activities-label">Activities on your link</h2>
          <LinkHistoryDetails data={data} />
        </div>
      </div>
    </div>
  );
};

export default LinkHistory;
