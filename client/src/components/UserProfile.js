import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import M from "materialize-css";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );

  useEffect(() => {
    fetch(`http://localhost:4000/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUserProfile(result);
      });
  }, []);

  const followUser = () => {
    fetch("http://localhost:4000/follow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        M.toast({
          html: "Followed the user",
          classes: "rounded green darken-1",
        });
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("http://localhost:4000/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile((prevState) => {
          const newFollowerList = prevState.user.followers.filter(
            (item) => item != data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollowerList,
            },
          };
        });
        M.toast({
          html: "Unfollowed the user",
          classes: "rounded green darken-1",
        });
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setShowFollow(true);
      });
  };

  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile-top">
            <div>
              <img
                className="profile-img"
                src={userProfile ? userProfile.user.pic : "loading"}
                alt="img"
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div className="profile-details">
                <h6>{userProfile.post.length} posts</h6>
                <h6>
                  {userProfile.user.followers.length} follower
                  {userProfile.user.followers.length > 1 && "s"}
                </h6>
                <h6>
                  {userProfile.user.following.length} following
                  {userProfile.user.following.length > 1 && "s"}
                </h6>
              </div>
              {showFollow ? (
                <button
                  className="waves-effect waves-light btn #1976d2 blue darken-2s follow-btn"
                  onClick={() => followUser()}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="waves-effect waves-light btn #1976d2 blue darken-2s follow-btn"
                  onClick={() => unfollowUser()}
                >
                  Unfollow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile.post.map((post) => {
              return (
                <img key={post._id} src={post.pic} alt="img" className="item" />
              );
            })}
          </div>
        </div>
      ) : (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      )}
    </>
  );
}

export default UserProfile;
