import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (url) {
      fetch("http://localhost:4000/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            M.toast({ html: data.error, classes: "rounded red darken-3" });
          } else {
            M.toast({
              html: "Post created successfully",
              classes: "rounded green darken-1",
            });
            history.push("/");
          }
        });
    }
  }, [url]);
  const postData = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "dreevo-cloud");
    await fetch("https://api.cloudinary.com/v1_1/dreevo-cloud/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card input-field">
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="body"
        onChange={(e) => setBody(e.target.value)}
        value={body}
      />
      <div className="file-field input-field">
        <div className="btn #1976d2 blue darken-2s">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="waves-effect waves-light btn #1976d2 blue darken-2s"
        onClick={postData}
      >
        Submit Post
      </button>
    </div>
  );
}

export default CreatePost;
