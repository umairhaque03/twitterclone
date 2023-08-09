import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Tweetbox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  //Will collect information and send it to firestore
  const sendTweet = async (e) => {
    e.preventDefault(); //Prevents refreshing

    //Information to send to firesore
    const newPost = {
      displayName: "Anonymous",
      username: "batman",
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar:
        "https://www.pngitem.com/pimgs/m/76-762864_security-hacker-anonymous-clip-art-hacker-clipart-hd.png",
      likes: 0,
      retweet: 0,
      replyCount: 0,
      timestamp: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://www.pngitem.com/pimgs/m/76-762864_security-hacker-anonymous-clip-art-hacker-clipart-hd.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's Happening?"
            type="text"
          />
        </div>
        <input
          onChange={(e) => setTweetImage(e.target.value)}
          value={tweetImage}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default Tweetbox;
