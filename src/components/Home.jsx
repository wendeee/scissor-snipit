import React from "react";
import NavBar from "./NavBar";
import heroimage from "../Asset/banner-image.png";

const Home = () => {
  return (
    <div>
      <NavBar />

      <div className="main-text-section mt-32 flex flex-col-reverse md:flex-row items-center">
        <div className="hero-text  md:w-1/2 md:pr-8">
          <h1>Shorten links using your own custom name.</h1>
          <p>
            Create, customize links, generates QRCodes and share with your
            audience.{" "}
          </p>
        </div>
        <div className="hero-image col-span-1">
          <img src={heroimage} alt="" className="w-1/2 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default Home;
