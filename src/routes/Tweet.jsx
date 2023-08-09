import React from "react";
import Widgets from "../components/Widgets.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Replyfeed from "../components/Replyfeed.jsx";
import "./Tweet.css";
function Tweet() {
  return (
    <div className="tweet">
      <Sidebar />
      <Replyfeed />
      <Widgets />
    </div>
  );
}

export default Tweet;
