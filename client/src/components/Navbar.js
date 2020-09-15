import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

function Navbar() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li key="prof">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="create">
          <Link to="/createpost">Create Post</Link>
        </li>,
        <li key="logout">
          <button
            className="waves-effect waves-light btn #1976d2 blue darken-2s"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/signin");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="signin">
          <Link to="/signin">Sign in</Link>
        </li>,
        <li key="signup">
          <Link to="/signup">Sign up</Link>
        </li>,
      ];
    }
  };
  return (
    <div>
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? "/" : "/signin"} className="brand-logo">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
