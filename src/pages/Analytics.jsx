import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Analytics = () => {
  const [urlDetails, setUrlDetails] = useState([]);
  // eslint-disable-next-line
  const [responseMessage, setResponseMessage] = useState("");
  const [activeURL, setActiveURL] = useState(null);
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
            setUrlDetails(data.data.generatedShortUrl);
            setActiveURL(data.data.generatedShortUrl[0]);
            console.log("DATA:", data);
          }
        }
      } catch (err) {}
    };
    fetchData();
  }, [navigate, baseURL]);

  const handleURLClick = (url) => {
    setActiveURL(url);
  };

  return (
    <div className="dashboard-container">
      <NavBar isLoggedIn={true} />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <h2 className="title">All Links</h2>

          <div className="url-list-component">
            <div className="left-section">
              {urlDetails.map((url) => (
                <div
                  key={url}
                  className={`link-item ${url === activeURL ? "active" : ""}`}
                  onClick={() => handleURLClick(url)}
                >
                  <p>{url.shortURL}</p>
                  <p>{url.longURL}</p>
                </div>
              ))}
            </div>
            <div className="vertical-border"></div>
            <div className="right-section">
              <div className="link-details">
                <h2>Link Stats</h2>
                <p className="view-count">
                  View Count:{" "}
                  <span className="count">
                    {activeURL?.numberOfClicksOnShortUrl}
                  </span>
                </p>
                <div className="click-location">
                  <p className="title">Clicks Locations</p>
                  {activeURL?.clickLocation.map((location, index) => (
                    <p key={index}>{location.location}</p>
                  ))}
                </div>

                <img src={activeURL && activeURL.qrcodeurl} alt="QR Code" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
