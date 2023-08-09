import React, { useEffect, useState } from "react";
import "./Feed.css";
import Tweetbox from "./Tweetbox.jsx";
import Post from "./Post";
import { db, onSnapshot, collection } from "./firebase";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  //Will pull all posts from database
  useEffect(() => {
    const pullDb = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => pullDb();
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <Tweetbox />
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
    </div>
  );
}

export default Feed;
