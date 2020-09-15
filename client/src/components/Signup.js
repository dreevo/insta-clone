import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const postDate = async () => {
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
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
        <button
          className="waves-effect waves-light btn #1976d2 blue darken-2s"
          onClick={postDate}
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
