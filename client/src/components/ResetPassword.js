import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const postData = async () => {
    await fetch("http://localhost:4000/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "rounded red darken-3" });
        } else {
          M.toast({
            html: data.message,
            classes: "rounded green darken-1",
          });
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
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <button
          className="waves-effect waves-light btn #1976d2 blue darken-2s"
          onClick={() => postData()}
        >
          Send Verification
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
