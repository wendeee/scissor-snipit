import React from "react";
import NavBar from "./NavBar";
import heroimage from "../Asset/banner-image.png";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (isButtonClicked) {
      navigate("/login");
    }
  }, [navigate, isButtonClicked]);

  const handleStartForFreeLinkClick = () => {
    setIsButtonClicked(true);
  };
  return (
    <div>
      <NavBar />

      <div className="main-text-section ">
        <div className="hero-text  ">
          <h1>Create customized short links from long urls.</h1>
          <p>
            Create, customize links, generates QRCodes and share with your
            audience.{" "}
          </p>
          <button
            className="secondary-button"
            type="button"
            onClick={handleStartForFreeLinkClick}
          >
            START FOR FREE
          </button>
        </div>
        <div className="hero-image ">
          <img src={heroimage} alt="" className="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
