import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

function Home() {
  const [posts, setPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/allposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPosts(result.posts);
      });
  }, []);

  const likePost = async (id) => {
    await fetch("http://localhost:4000/like", {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          if (item._id == result._id) {
            result.postedBy = item.postedBy;
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = async (id) => {
    await fetch("http://localhost:4000/unlike", {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          if (item._id == result._id) {
            result.postedBy = item.postedBy;
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="home">
      {posts?.map((post) => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>{post.postedBy.name}</h5>
            <div className="card-image">
              <img alt="img" src={post.pic} />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {post.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  onClick={() => unlikePost(post._id)}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => likePost(post._id)}
                >
                  thumb_up
                </i>
              )}

              <h6>{post.title}</h6>
              <h6>{post.likes.length} likes</h6>
              <p>{post.body}</p>
              <input type="text" placeholder="add a comment.." />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
