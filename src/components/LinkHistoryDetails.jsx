import React from "react";

const LinkHistoryDetails = (props) => {
  return (
    <div className="urls-component">
      <div className="header">
        <h2 className="title">All created URLs</h2>
      </div>
      <table className="url-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>

            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {/* Add table rows with data dynamically */}
          {props.data.map((data, index) => (
            <tr key={index}>
              <td>{data.shortURL}</td>
              <td>{data.longURL}</td>

              <td>{new Date(data.createdat).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkHistoryDetails;
