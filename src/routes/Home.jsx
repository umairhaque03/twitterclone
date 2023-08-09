import React from "react";
import "./Home.css";
import Widgets from "../components/Widgets.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Feed from "../components/Feed.jsx";
function Home() {
  return (
    <div className="home">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default Home;
