import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import M from "materialize-css";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/getSubPost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
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
            result.comments.commentedBy = item.comments.commentedBy;
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
            result.comments.commentedBy = item.comments.commentedBy;
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

  const postComment = async (text, postId) => {
    await fetch("http://localhost:4000/comment", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        postId,
        text,
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
        document.getElementById(`comment-input${postId}`).value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = async (postId) => {
    fetch(`http://localhost:4000/deletepost/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        M.toast({
          html: "Post deleted successfully",
          classes: "rounded green darken-1",
        });
        const newData = posts.filter((post) => {
          return post._id != result._id;
        });
        setPosts(newData);
      });
  };

  const deleteComment = async (postId, commentId) => {
    fetch(`http://localhost:4000/deleteComment/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newData);
      });
  };

  return (
    <div className="home">
      {posts.length == 0 && (
        <h3 style={{ textAlign: "center" }}>No Posts available</h3>
      )}
      {posts?.map((post) => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>
              <Link
                to={
                  post.postedBy._id !== state._id
                    ? `/profile/${post.postedBy._id}`
                    : "/profile"
                }
              >
                <img
                  className="post-avatar"
                  alt="avatar"
                  src={post.postedBy.pic}
                />
                {post.postedBy.name}
              </Link>
              {post.postedBy._id == state._id && (
                <i
                  className="material-icons"
                  style={{ float: "right" }}
                  onClick={() => deletePost(post._id)}
                >
                  delete
                </i>
              )}
            </h5>

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
              {post.comments.map((comment) => {
                return (
                  <h6 key={comment._id}>
                    <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                      {comment.commentedBy.name}
                    </span>
                    {comment.text}
                    {comment.commentedBy._id == state._id && (
                      <i
                        className="material-icons"
                        style={{ float: "right" }}
                        onClick={() => deleteComment(post._id, comment._id)}
                      >
                        delete
                      </i>
                    )}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  postComment(e.target[0].value, post._id);
                }}
              >
                <input
                  id={`comment-input${post._id}`}
                  type="text"
                  placeholder="add a comment.."
                />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
