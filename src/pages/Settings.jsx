import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
const Settings = () => {
  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <form className="login-form" id="dashboard-form">
            <label>
              Name:
              <input type="text" />
            </label>
            <br />
            <label>
              Email:
              <input type="text" />
            </label>
            <br />
            <button className="create-link-btn">Save Changes</button>
          </form>

          <form className="login-form" id="dashboard-form">
            <label>
              Current Password:
              <input type="text" />
            </label>
            <br />
            <label>
              New Password:
              <input type="text" />
            </label>
            <br />
            <label>
              Confirm Password:
              <input type="text" />
            </label>
            <br />
            <button className="create-link-btn">Save Changes</button>
          </form>

          <form className="login-form" id="dashboard-form">
            <label>
              Email
              <input type="text" />
            </label>
            <br />

            <button className="create-link-btn" id="del-account">
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
