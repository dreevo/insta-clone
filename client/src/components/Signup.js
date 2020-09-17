import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const [email, setEmail] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (url) {
      uploadFields();
    }
  }, [url]);

  const uploadPic = async () => {
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

  const uploadFields = async () => {
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        pic: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          M.toast({ html: data.error, classes: "rounded red darken-3" });
        } else {
          M.toast({ html: data.message, classes: "rounded green darken-1" });
          history.push("/signin");
        }
      });
  };

  const postData = async () => {
    if (image) {
      uploadPic();
    } else {
      uploadFields();
    }
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram </h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="file-field input-field">
          <div className="btn #1976d2 blue darken-2s">
            <span>Profile Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button
          className="waves-effect waves-light btn #1976d2 blue darken-2s"
          onClick={() => postData()}
        >
          Sign up
        </button>
        <h5>
          <Link to="/signin">Already have an account ? </Link>
        </h5>
      </div>
    </div>
  );
}

export default Signup;
