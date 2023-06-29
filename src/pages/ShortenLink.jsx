import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ShortenLink = () => {
  const [longURL, setLongUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    if (isButtonClicked) {
      const createShortURL = async () => {
        setIsLoading(true);
        const token = Cookies.get("jwtToken");
        try {
          const response = await fetch("http://localhost:3001/api/v1/url", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ longURL, customName }),
          });
          console.log(response.body);

          //set for response type
          if (!response.ok) {
            // Handle server error response
            const errorResponse = await response.json();
            console.log("Server Error Response:", errorResponse);
            setResponseMessage(`Error: ${errorResponse.message}`);
          } else {
            console.log("RESPONSE:", response);
            // Handle successful response
            const data = await response.json();
            console.log("DATA:", data);
            setResponseMessage(
              `Your generated link: ${data.data.customUrl.shortURL}`
            );
            // if (data.status === 200) {
            //   console.log("DATA:", data);
            //   setResponseMessage(
            //     `Your generated link: ${data.data.customUrl.shortURL}`
            //   );
            // }
          }
        } catch (error) {
          console.log(error);
          setResponseMessage("An error occurred. Please try again.");
        }
        setIsLoading(false); //make post request
        setIsButtonClicked(false);
      };
      createShortURL();
    }
  }, [longURL, customName, isButtonClicked]);

  //Handle click event and data update
  const handleLongURLChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleCustomNameChange = (event) => {
    setCustomName(event.target.value);
  };
  const handleGenerateLink = () => {
    setIsButtonClicked(true);
  };
  return (
    <div className="dashboard-container">
      <NavBar isLoggedIn={true} />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <form className="login-form" id="dashboard-form">
            <label>
              Destination URL:
              <input
                type="text"
                value={longURL}
                onChange={handleLongURLChange}
              />
            </label>
            <br />
            <label>
              Custom name (optional):
              <input
                type="text"
                value={customName}
                onChange={handleCustomNameChange}
              />
            </label>
            <br />
            <button
              className="create-link-btn"
              onClick={handleGenerateLink}
              disabled={isLoading}
            >
              {isLoading ? "Generating Link..." : "Create Link"}
            </button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
          {/* <img src={dashboardImage} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default ShortenLink;
