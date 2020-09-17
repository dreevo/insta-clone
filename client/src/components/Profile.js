import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import M from "materialize-css";

function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setMyPosts(result.myPosts);
      });
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dreevo-cloud");
      fetch("https://api.cloudinary.com/v1_1/dreevo-cloud/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);

          fetch("http://localhost:4000/updatePic", {
            method: "PUT",
            headers: {
              "Content-Type": "Application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATE_PIC", payload: result.pic });
              M.toast({
                html: "Updated profile photo",
                classes: "rounded green darken-1",
              });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);

  const uploadPhoto = (file) => {
    setImage(file);
  };

  return (
    <div className="profile">
      <div className="profile-top">
        <div className="picture-section">
          <img
            className="profile-img"
            src={state ? state.pic : "loading"}
            alt="img"
          />
          <div className="file-field input-field" style={{ margin: "10px" }}>
            <div className="btn #1976d2 blue darken-2s">
              <span>Update Photo</span>
              <input
                type="file"
                onChange={(e) => uploadPhoto(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <h5>{state ? state.email : "loading"}</h5>
          <div className="profile-details">
            <h6>{myPosts.length} posts</h6>
            <h6>{state ? state.followers.length : 0} followers</h6>
            <h6>{state ? state.following.length : 0} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {myPosts.map((post) => {
          return (
            <img key={post._id} src={post.pic} alt="img" className="item" />
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
