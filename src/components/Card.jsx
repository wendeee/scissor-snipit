import React from "react";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="left-content">
          <span className="label">{props.name}</span>
          <span className="count">{props.count}</span>
        </div>
        <div className="right-content">
          <img src={props.photoName} alt="" className="icon" />
        </div>
      </div>
    </div>
  );
};

export default Card;
