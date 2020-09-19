import React, { useEffect, createContext, useReducer, useContext } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import CreatePost from "./components/CreatePost";
import SubscribedPosts from "./components/SubscribedPosts";
import ResetPassword from "./components/ResetPassword";
import { initialState, reducer } from "./reducers/userReducer";
import NewPassword from "./components/NewPassword";

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if (!history.location.pathname.startsWith("/passwordReset")) {
        history.push("/signin");
      }
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
      <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingPosts">
        <SubscribedPosts />
      </Route>
      <Route path="/passwordReset" exact>
        <ResetPassword />
      </Route>
      <Route path="/passwordReset/:token">
        <NewPassword />
      </Route>
    </Switch>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <div className="App">
          <Navbar />
          <Routing />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
