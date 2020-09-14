import React from "react";

function Profile() {
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
          <h4>Emma Watson</h4>
          <div className="profile-details">
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img
          src="https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
          className="item"
        />
        <img
          src="https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
          className="item"
        />
        <img
          src="https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
          className="item"
        />
        <img
          src="https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
          className="item"
        />
        <img
          src="https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
          className="item"
        />
        <img
          src="https://images.pexels.com/photos/1103093/pexels-photo-1103093.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="img"
          className="item"
        />
      </div>
    </div>
  );
}

export default Profile;
