import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import AnalyticsIcon from "../Asset/analyticsicon.png";
import URLDetails from "../components/URLDetails";
import Cookies from "js-cookie";
const Dashboard = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isSeeAllButtonClicked, setIsSeeAllButtonClicked] = useState(false);

  // eslint-disable-next-line
  const [responseMessage, setResponseMessage] = useState("");
  const [data, setData] = useState([]);
  const [urlDetails, setUrlDetails] = useState([]);
  const navigate = useNavigate();
  const baseURL = `https://snipit.onrender.com`;
  //make API call
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("jwtToken");
      try {
        //handle button click
        if (isButtonClicked) {
          navigate("/dashboard/create");
        }
        if (isSeeAllButtonClicked) {
          navigate("/dashboard/history");
        }

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
            setData(data.data);
            setUrlDetails(data.data.generatedShortUrl);
            console.log("DATA:", data.data.generatedShortUrl);
          }
        }
      } catch (err) {}
    };
    fetchData();
  }, [navigate, isButtonClicked, isSeeAllButtonClicked, baseURL]);

  const handleCreateLinkClick = () => {
    setIsButtonClicked(true);
  };

  const handleSeeAllClick = () => {
    setIsSeeAllButtonClicked(true);
  };
  return (
    <div>
      <NavBar isLoggedIn={true} />
      <SideBar />
      <div className="dashboard-container overscroll-auto z-30">
        <div className="dashboard-content ">
          <h1>Welcome, User</h1>

          <div className="activity-stat-cta">
            <p>Activity Stats</p>
            <button
              type="button"
              className="create-link-btn"
              onClick={handleCreateLinkClick}
            >
              Create a link
            </button>
          </div>
          <div className="card-component">
            <Card
              name="SHORT URLS CREATED"
              count={data.shortUrlCount}
              photoName={AnalyticsIcon}
            />
            <Card
              name="QRCODE GENERATED"
              count={data.QRCodeCount}
              photoName={AnalyticsIcon}
            />
            <Card name="CLICK RATE" count="10%" photoName={AnalyticsIcon} />
          </div>

          {/* URL DETAILS COMPONENT */}
          <URLDetails urlDetails={urlDetails} seeAll={handleSeeAllClick} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
