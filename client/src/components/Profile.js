import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

function Profile() {
  const [myPosts, setMyPosts] = useState([]);
  const { state, dispatch } = useContext(UserContext);
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
  return (
    <div className="profile">
      <div className="profile-top">
        <div>
          <img
            className="profile-img"
            src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="img"
          />
        </div>
        <div>
          <h4>{state ? state.name : "loading"}</h4>
          <div className="profile-details">
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
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
