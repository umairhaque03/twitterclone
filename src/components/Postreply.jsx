import React, { forwardRef, useState } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { db } from "./firebase";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";

const Postreply = forwardRef(
  (
    {
      tweetId,
      displayName,
      username,
      verified,
      text,
      image,
      avatar,
      likes,
      retweet,
      timestamp,
      originalTweet,
    },
    ref
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweeted] = useState(false);

    //Will update the likes for the reply
    const handleLike = async () => {
      setLiked(!liked);

      const newLikesCount = liked ? likes - 1 : likes + 1;
      try {
        const postRef = doc(db, "reply", tweetId);
        await updateDoc(postRef, { likes: newLikesCount });
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    };

    //Will update the retweet count for the reply
    const handleRetweet = async () => {
      setRetweeted(!retweeted);

      const newRetweetCount = retweeted ? retweet - 1 : retweet + 1;
      try {
        const postRef = doc(db, "reply", tweetId);
        await updateDoc(postRef, { retweet: newRetweetCount });
      } catch (error) {
        console.error("Error updating retweets:", error);
      }
    };

    //Will delete the specific reply from firestore, and reduce the reply count by 1
    const handleDelete = async (e) => {
      const tweetId = e.target.value;

      try {
        // Delete the reply document
        await deleteDoc(doc(db, "reply", tweetId));

        // Fetch the original tweet document and update the reply count
        const tweetRef = doc(db, "posts", originalTweet);
        const tweetDoc = await getDoc(tweetRef);

        if (tweetDoc.exists()) {
          const currentReplyCount = tweetDoc.data().replyCount || 0;
          await updateDoc(tweetRef, { replyCount: currentReplyCount - 1 });
        }
      } catch (error) {
        console.error("Error deleting reply:", error);
      }
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post_headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username} ·
                  <span className="post__timestamp">
                    {new Date(timestamp?.toDate()).toLocaleString("en-US")}
                  </span>
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {image && <img className="image" src={image} alt="Post" />}
          <div className="post__footer">
            <div>
              <RepeatIcon
                onClick={handleRetweet}
                className={retweeted ? "retweeted" : ""}
                fontSize="small"
              />
              {retweet.toLocaleString("en-US")}
            </div>

            <div>
              <FavoriteBorderIcon
                onClick={handleLike}
                className={liked ? "liked" : ""}
                fontSize="small"
              />
              {likes.toLocaleString("en-US")}
            </div>
            <div className="post__dropdown">
              <button
                className="post__dropdownButton"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                ...
              </button>
              {isDropdownOpen && (
                <div className="post__dropdownContent">
                  <button value={tweetId} onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Postreply;
