import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
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
  return (
    <>
      {userProfile ? (
        <div className="profile">
          <div className="profile-top">
            <div>
              <img
                className="profile-img"
                src="http://mastere.utm.rnu.tn/uploads/profile/d3b1fb47eaaf14c9d47297954bd75e0b.jpeg"
                alt="img"
              />
            </div>
            <div>
              <h4>{userProfile.user.name}</h4>
              <h5>{userProfile.user.email}</h5>
              <div className="profile-details">
                <h6>{userProfile.post.length} posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
              </div>
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
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default UserProfile;
