import "./App.css";
import "./Custom.css";
import "./global.css";
// import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import QRCode from "./pages/QRCode";
import Analytics from "./pages/Analytics";
import LinkHistory from "./pages/LinkHistory";
import ShortenLink from "./pages/ShortenLink";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App ">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/qrcode" element={<QRCode />} />
          <Route path="/dashboard/history" element={<LinkHistory />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/dashboard/create" element={<ShortenLink />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
