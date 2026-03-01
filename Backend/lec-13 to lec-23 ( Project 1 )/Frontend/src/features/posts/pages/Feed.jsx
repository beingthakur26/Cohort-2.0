// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from "react";
// import "../style/feed.scss";
// import Post from "../components/Post";
// import { usePost } from "../hook/usePost";

// const Feed = () => {

//   const { feed, handleGetFeed, loading } = usePost();

//   // ✅ Hooks must be declared before any return
//   const [likedPosts, setLikedPosts] = useState({});

//   const toggleLike = (id) => {
//     setLikedPosts((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   useEffect(() => {
//     handleGetFeed();
//   }, []);

//   // ✅ After all hooks
//   if (loading) {
//     return <main className="loading">Feed is Loading...</main>;
//   }

//   if (!feed) {
//     return <main className="loading">No posts found</main>;
//   }

//   return (
//     <main className="feed">
//       <div className="posts">
//         {feed.map((post) => (
//           <Post
//             key={post._id} // backend uses _id
//             post={post}
//             isLiked={likedPosts[post._id]}
//             toggleLike={toggleLike}
//           />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Feed;



/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import "../style/feed.scss";
import Post from "../components/Post";
import { usePost } from "../hook/usePost";

const Feed = () => {

  const { feed, handleGetFeed, loading, setFeed } = usePost();
  // IMPORTANT: we will update feed directly when user likes

  useEffect(() => {
    handleGetFeed();   // fetch posts on mount
  }, []);

  // Like logic
  const toggleLike = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/posts/like/${id}`, {
        method: "POST",
        credentials: "include"
      });

      // Update UI locally after successful like
      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === id
            ? { ...post, isLiked: true }   // set to true because backend only supports like
            : post
        )
      );

    } catch (err) {
      console.error("Like error:", err);
    }
  };

  if (loading) {
    return <main className="loading">Feed is Loading...</main>;
  }

  if (!feed || feed.length === 0) {
    return <main className="loading">No posts found</main>;
  }

  return (
    <main className="feed">
      <div className="posts">
        {feed.map((post) => (
          <Post
            key={post._id}
            post={post}
            isLiked={post.isLiked}   // ✅ use backend value directly
            toggleLike={toggleLike}
          />
        ))}
      </div>
    </main>
  );
};

export default Feed;
