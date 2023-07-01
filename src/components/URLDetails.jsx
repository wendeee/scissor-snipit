import React from "react";

const URLDetails = (props) => {
  // Dummy data for table rows
  // console.log("URLDETAILS: ", props);
  // const dummyData = [
  //   { shortURL: "abcde", longURL: "http://example1.com", views: 10 },
  //   { shortURL: "fghij", longURL: "http://example2.com", views: 5 },
  //   { shortURL: "klmno", longURL: "http://example3.com", views: 8 },
  // ];
  const displayedUrls = props.urlDetails.slice(0, 3);

  return (
    <div className="urls-component">
      <div className="header">
        <h2 className="title">Latest URLs</h2>
        <button className="see-all-button" type="button" onClick={props.seeAll}>SEE ALL</button>
      </div>
      <table className="url-table">
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Long URL</th>
            <th>Views</th>
          </tr>
        </thead>
        <tbody>
          {/* Add table rows with data dynamically */}
          {displayedUrls.map((data, index) => (
            <tr key={index}>
              <td>{data.shortURL}</td>
              <td>{data.longURL}</td>
              <td>{data.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default URLDetails;
