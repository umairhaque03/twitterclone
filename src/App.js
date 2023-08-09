import React from "react";
import "./App.css";
import Home from "./routes/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Tweet from "./routes/Tweet";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tweet/:tweetId" element={<Tweet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;