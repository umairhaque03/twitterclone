import React, { useState } from "react";
import "./Replybox.css";
import { Avatar, Button } from "@mui/material";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

function Replybox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const { tweetId } = useParams();

  //Will add the reply to the database
  const sendReply = async (e) => {
    e.preventDefault(); //Prevents refreshing

    //Information to send to firestore
    const newReply = {
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
      tweet: tweetId,
    };

    try {
      const docRef = await addDoc(collection(db, "reply"), newReply);

      // Fetch the current replyCount from the tweet document and update it
      const tweetRef = doc(db, "posts", tweetId);
      const tweetDoc = await getDoc(tweetRef);

      if (tweetDoc.exists()) {
        const currentReplyCount = tweetDoc.data().replyCount || 0;
        await updateDoc(tweetRef, { replyCount: currentReplyCount + 1 });
      }
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
            placeholder="Post your reply!"
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
          onClick={sendReply}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Reply
        </Button>
      </form>
    </div>
  );
}

export default Replybox;
