import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import M from "materialize-css";

function NewPassword() {
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { token } = useParams();
  const postData = async () => {
    await fetch("http://localhost:4000/newPassword", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        password,
        token,
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
          type="password"
          placeholder="Enter the new password.."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          className="waves-effect waves-light btn #1976d2 blue darken-2s"
          onClick={() => postData()}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default NewPassword;
