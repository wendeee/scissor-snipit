import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
const LinkHistory = () => {
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
        </div>
      </div>
    </div>
  );
};

export default LinkHistory;
