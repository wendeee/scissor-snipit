import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
const Analytics = () => {
  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <h2>Activities on your link</h2>
          <table>
            <thead>
              <tr>
                <th>Link</th>
                <th>Click Number</th>
                <th>Click Location</th>
              </tr>
            </thead>
            <tbody>
              <tr key={""}>
                <td>{""}</td>
                <td>{""}</td>
                <td>{""}</td>
              </tr>
            </tbody>
          </table>
          {/* <form className="login-form" id="dashboard-form">
                <label>
                  Destination URL:
                  <input type="text" />
                </label>
                <br />
                <label>
                  Custom name (optional):
                  <input type="text" />
                </label>
                <br />
                <button className="create-link-btn">Create a link</button>
              </form>
              <p id="short-url">Your generated link:</p> */}
          {/* <img src={dashboardImage} alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
