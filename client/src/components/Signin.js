import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

function Signin() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const postDate = async () => {
    await fetch("http://localhost:4000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
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
          console.log(`user : ${data.user.name} and token : ${data.token}`);
          console.log(data.user);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "Signed in successfully",
            classes: "rounded green darken-1",
          });
          history.push("/");
        }
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card">
        <h2>Instagram </h2>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="waves-effect waves-light btn #1976d2 blue darken-2s"
          onClick={postDate}
        >
          Sign in
        </button>
        <h5>
          <Link to="/signup">Don't have an account ? </Link>
        </h5>
      </div>
    </div>
  );
}

export default Signin;
