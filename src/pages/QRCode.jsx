import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const QRCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shortURL, setShortURL] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  //eslint-disable-next-line
  const [responseMessage, setResponseMessage] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const baseURL = `https://snipit.onrender.com`;

  useEffect(() => {
    if (isButtonClicked) {
      const createQRCode = async () => {
        setIsLoading(true);
        const token = Cookies.get("jwtToken");
        try {
          const response = await fetch(`${baseURL}/api/v1/url/qrcode`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ shortURL }),
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
              console.log("DATA:", data);
              setResponseMessage(`QRCode: ${data.data.qrCodeImageUrl}`);
              setQrCodeUrl(data.data.qrCodeImageUrl);
              setIsModalOpen(true);
            }
          }
        } catch (error) {
          console.log(error.message);
          setResponseMessage("An error occurred. Please try again.");
        }
        setIsLoading(false);
        setIsButtonClicked(false);
      };
      createQRCode();
    }
  }, [shortURL, isButtonClicked, navigate, baseURL]);

  const handleShortURLChange = (event) => {
    setShortURL(event.target.value);
  };

  const handleGenerateQRCode = (event) => {
    event.preventDefault();
    setIsButtonClicked(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setQrCodeUrl("");
  };

  const handleDownloadQRCode = () => {
    fetch(qrCodeUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log("An error occurred while downloading the QR code:", error);
      });
  };

  return (
    <div className="dashboard-container">
      <NavBar isLoggedIn={true} />
      <div className="dashboard-content-wrapper">
        <SideBar />
        <div className="dashboard-content">
          <p className="generate-qrcode">
            Generate a QRCode for your custom short link
          </p>
          <form className="login-form" id="dashboard-form">
            <label>
              Short URL:
              <input
                type="text"
                value={shortURL}
                onChange={handleShortURLChange}
              />
            </label>
            <br />

            <button
              className="create-link-btn"
              type="button"
              onClick={handleGenerateQRCode}
              disabled={isLoading}
            >
              {isLoading ? "Generating QRCode..." : "Generate QRCode"}
            </button>
          </form>
        </div>
      </div>
      {qrCodeUrl && isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Your QRCode is ready!!!</h2>
            <img src={qrCodeUrl} alt="QR Code" />
            <button onClick={handleDownloadQRCode}>Download QR Code</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCode;
