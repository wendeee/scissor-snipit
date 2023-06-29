import React from "react";
import SideBarData from "./SideBarData";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {SideBarData.map((val, key) => {
          return (
            <li
              id={window.location.pathname === val.link ? "active" : ""}
              className="sidebar-list-row"
              key={key}
              //   onClick={() => <Link to={val.link} />}
            >
              {" "}
              <Link to={val.link} className="sidebar-list-row">
                <div id="sidebar-icon">{val.icon}</div>{" "}
                <div id="sidebar-title">{val.title}</div>{" "}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
