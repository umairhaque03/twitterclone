import React from "react";
import "./Widgets.css";
import SearchIcon from "@mui/icons-material/Search";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";

//Widgets that will show up on the right side of the screen
function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>
      <div className="widgets__widgetContainer">
        <h2>What's Happening</h2>
        <TwitterTweetEmbed tweetId={"745696347693654016"} />
        <TwitterTweetEmbed tweetId={"742947307117772800"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="HaqueUmair"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
}

export default Widgets;
