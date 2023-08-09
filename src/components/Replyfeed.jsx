import React, { useEffect, useState } from "react";
import "./Replyfeed.css";
import Replybox from "./Replybox";
import Postreply from "./Postreply";
import { db, onSnapshot, collection } from "./firebase";
import FlipMove from "react-flip-move";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Post from "./Post";
function Replyfeed() {
  const { tweetId } = useParams(); // Get the 'tweetId' from the URL parameter

  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    //Will pull the tweet based on its specific ID from the database
    const pullDb = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((post) => post.id === tweetId)
      );
    });

    //All replies have a field that displays its tweet ID
    //Will pull the replies that have the same tweetID in the feild from the URL parameter
    const pullReplies = onSnapshot(collection(db, "reply"), (snapshot) => {
      const matchingReplies = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((reply) => reply.tweet === tweetId);

      setReplies(matchingReplies);
    });

    return () => {
      pullDb();
      pullReplies();
    };
  }, [tweetId]);

  //Will return user to home screen
  const handleBack = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="feed">
      <div className="feed__header">
        <ArrowBackIcon
          variant="outlined"
          className="back"
          onClick={handleBack}
        />
      </div>

      {/* Will post the original tweet */}
      <FlipMove>
        {posts.map((post) => (
          <Post
            tweetId={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            retweet={post.retweet}
            replyCount={post.replyCount}
            timestamp={post.timestamp}
          />
        ))}
      </FlipMove>

      <div className="reply__box">
        <Replybox />
      </div>

      {/* Will post the replies */}
      <div className="replies">
        <FlipMove>
          {replies.map((reply) => (
            <Postreply
              key={reply.id}
              tweetId={reply.id}
              displayName={reply.displayName}
              username={reply.username}
              verified={reply.verified}
              text={reply.text}
              avatar={reply.avatar}
              image={reply.image}
              likes={reply.likes}
              retweet={reply.retweet}
              replyCount={reply.replyCount}
              timestamp={reply.timestamp}
              originalTweet={reply.tweet}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Replyfeed;
