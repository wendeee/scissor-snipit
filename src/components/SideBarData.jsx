import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import QrCodeIcon from "@mui/icons-material/QrCode";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const SideBarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/dashboard",
  },
  {
    title: "Link History",
    icon: <HistoryIcon />,
    link: "/dashboard/history",
  },
  {
    title: "QRCode",
    icon: <QrCodeIcon />,
    link: "/dashboard/qrcode",
  },
  {
    title: "Analytics",
    icon: <AssessmentOutlinedIcon />,
    link: "/dashboard/analytics",
  },
  {
    title: "Settings",
    icon: <SettingsOutlinedIcon />,
    link: "/dashboard/#",
  },
];

export default SideBarData;
