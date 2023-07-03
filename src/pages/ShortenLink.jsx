import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ShortenLink = () => {
  const [longURL, setLongUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const baseURL = `https://snipit.onrender.com`;

  useEffect(() => {
    if (isButtonClicked) {
      const createShortURL = async () => {
        setIsLoading(true);
        const token = Cookies.get("jwtToken");
        try {
          const response = await fetch(`${baseURL}/api/v1/url`, {
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
            if (errorResponse.status === 401) {
              alert("Session expired!!! Please login");
              navigate("/");
            }
            setResponseMessage(`Error: ${errorResponse.message}`);
          } else {
            console.log("RESPONSE:", response);
            // Handle successful response
            const data = await response.json();
            console.log("DATA:", data);
            if (
              data.message[0].content ===
              "ShortUrl generated successfully from cache!!"
            ) {
              setResponseMessage(` ${data.data.customUrl}`);
            } else {
              setResponseMessage(`${data.data.customUrl.shortURL}`);
            }
            setIsModalOpen(true);
            // console.log("DATA MESSAGE: ", data.message[0].content);

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
  }, [longURL, customName, isButtonClicked, baseURL, navigate]);

  //Handle click event and data update
  const handleLongURLChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleCustomNameChange = (event) => {
    setCustomName(event.target.value);
  };
  const handleGenerateLink = (event) => {
    event.preventDefault();
    setIsButtonClicked(true);
  };

  const handleCopyLink = () => {
    const textField = document.createElement("textarea");
    textField.innerText = responseMessage; // Assuming `responseMessage` contains the short link
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setResponseMessage("");
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
                placeholder="http://example.com"
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
          {/* {responseMessage && (
            <div className="shortlink-text">
              <p>Link generated!!!</p>
              <p>{responseMessage}</p>
              <button
                className="copy-link-btn"
                onClick={handleCopyLink}
                disabled={isCopied}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          )} */}

          {/* using modal to pop short link */}
          {responseMessage && isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2 className="shortlink-modal-text-title">Short Link created!!!</h2>
                <p className="shortlink-modal-text">{responseMessage}</p>
                <button
                  className="copy-link-btn shortlink-btn"
                  onClick={handleCopyLink}
                  disabled={isCopied}
                >
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
          {/* <img src={dashboardImage} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default ShortenLink;
