import React from "react";

function Home() {
  return (
    <div className="home">
      <div className="card home-card">
        <h5>Gharbi</h5>
        <div className="card-image">
          <img
            alt="img"
            src="https://images.pexels.com/photos/1840421/pexels-photo-1840421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          />
        </div>
        <div className="card-content">
          <i className="material-icons" style={{ color: "red" }}>
            favorite
          </i>
          <h6>title</h6>
          <p>this is the body of the body</p>
          <input type="text" placeholder="add a comment.." />
        </div>
      </div>
    </div>
  );
}

export default Home;
