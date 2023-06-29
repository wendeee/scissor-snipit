import React from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
const QRCode = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [shortURL, setShortURL] = useState("");
  // const [isButtonClicked, setIsButtonClicked] = useState(false);
  // const [responseMessage, setResponseMessage] = useState("");
  // const [qrCodeUrl, setQrCodeUrl] = useState("");

  // useEffect(() => {
  //   if (isButtonClicked) {
  //     const createShortURL = async () => {
  //       setIsLoading(true);
  //       const token = Cookies.get("jwtToken");
  //       try {
  //         const response = await fetch(
  //           "http://localhost:3001/api/v1/url/qrcode",
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${token}`,
  //             },
  //             body: JSON.stringify({ shortURL }),
  //           }
  //         );

  //         if (!response.ok) {
  //           // Handle server error response
  //           const errorResponse = await response.json();
  //           console.log("Server Error Response:", errorResponse);
  //           setResponseMessage(`Error: ${errorResponse.message}`);
  //         } else {
  //           console.log("RESPONSE:", response);
  //           // Handle successful response
  //           const data = await response.json();
  //           if (data.status === 200) {
  //             console.log("DATA:", data);
  //             setResponseMessage(`QRCode: ${data.data.qrCodeImageUrl}`);
  //             setQrCodeUrl(data.data.qrCodeImageUrl); // Set the QR code URL
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error.message);
  //         setResponseMessage("An error occurred. Please try again.");
  //       }
  //       setIsLoading(false);
  //       setIsButtonClicked(false);
  //     };
  //     createShortURL();
  //   }
  // }, [shortURL, isButtonClicked]);

  // const handleShortURLChange = (event) => {
  //   setShortURL(event.target.value);
  // };

  // const handleGenerateQRCode = () => {
  //   setIsButtonClicked(true);
  // };
  return (
    <div className="dashboard-container">
      <NavBar />
      <div className="dashboard-content-wrapper">
        {" "}
        <SideBar />
        <div className="dashboard-content">
          <p className="generate-qrcode">
            Generate a QRCode for your custom short link
          </p>
          <form className="login-form" id="dashboard-form">
            <label>
              Short URL:
              <input type="text" />
            </label>
            <br />

            <button className="create-link-btn">Generate QRCode</button>
          </form>
          {/* <p id="short-url">Your generated link:</p> */}
          {/* <img src={dashboardImage} alt="" /> */}
        </div>
      </div>
    </div>
  );

  //   return (
  //     <div className="dashboard">
  //       <NavBar isLoggedIn={true} />
  //       <div className="main-body">
  //         <SideBar />
  //         <div className="main-body-txt">
  //           <p>Generate a QRCode for your custom short link</p>
  //           <div className="">
  //             <form className="login-form" id="dashboard-form">
  //               <label>
  //                 Short URL:
  //                 <input type="text" required value={""} onChange={""} />
  //               </label>
  //               <br />

  //               <br />
  //               <button
  //                 type="button"
  //                 className="login-btn"
  //                 onClick={""}
  //                 disabled={""}
  //               >
  //                 {/* {isLoading ? "Generating QRCode..." : "Generate QRCode"} */}
  //               </button>
  //             </form>
  //             {"" && (
  //               <div>
  //                 <p>{""}</p>
  //                 <img src={""} alt="QR Code" />
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
};

export default QRCode;
