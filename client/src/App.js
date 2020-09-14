import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/createpost">
          <CreatePost />
        </Route>
      </div>
    </Router>
  );
}

export default App;
