import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

function Navbar() {
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);
  const searchModal = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const renderList = () => {
    if (state) {
      return [
        <li key="search">
          <i
            className="material-icons modal-trigger"
            style={{ color: "black" }}
            data-target="modal1"
          >
            search
          </i>
        </li>,
        <li key="prof">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="create">
          <Link to="/createpost">Create Post</Link>
        </li>,
        <li key="myfollowing">
          <Link to="/myfollowingPosts">My following Posts</Link>
        </li>,
        <li key="logout">
          <button
            className="waves-effect waves-light btn #1976d2 blue darken-2s"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              M.toast({
                html: "Logged out successfully",
                classes: "rounded green darken-1",
              });
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

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("http://localhost:4000/searchUsers", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserDetails(result.user);
      });
  };

  return (
    <div className="navbar">
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

      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content">
          <input
            type="text"
            placeholder="search someone.."
            onChange={(e) => fetchUsers(e.target.value)}
            value={search}
          />
          <ul className="collection">
            {userDetails.map((user) => {
              return (
                <Link
                  to={
                    user._id !== state._id ? `/profile/${user._id}` : "/profile"
                  }
                  key={user.email}
                  onClick={() => setSearch("")}
                >
                  <li key={user.email} className="collection-item modal-close">
                    {user.email}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
