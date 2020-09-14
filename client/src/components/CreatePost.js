import React from "react";

function CreatePost() {
  return (
    <div className="card input-field">
      <input type="text" placeholder="title" />
      <input type="text" placeholder="body" />
      <div className="file-field input-field">
        <div className="btn #1976d2 blue darken-2s">
          <span>Upload Image</span>
          <input type="file" />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="waves-effect waves-light btn #1976d2 blue darken-2s">
        Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
