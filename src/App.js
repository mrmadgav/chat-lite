import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { socket } from "./components/helpers/io";
import { createBrowserHistory } from "history";

//Operations
import { getUser, getUsers } from "./Redux/Auth/Auth-operations";
import { setRoomId } from "./Redux/Chat/Chat-operations";

//Selectors
import { getToken, getNickname, getUserId } from "./Redux/selectors";

//Components
import Section from "../src/components/Section/Section";
import RegisterPanel from "./components/RegisterPanel/RegisterPanel.jsx";
import LoginPanel from "./components/LoginPanel/LoginPanel.jsx";
import Chat from "./components/Chat/Chat";
import MainMenu from "./components/MainMenu/MainMenu";
import LogOut from "./components/LogOut/LogOut";
import ChatList from "./components/ChatList/ChatList";
import MainPageImage from "./components/MainPageImage/MainPageImage";
import Logo from "./components/Logo/Logo";

//CSS
import "./App.css";
import "./index.css";
// import { StylesProvider } from "@material-ui/core";

// client-side
function App() {
  const history = createBrowserHistory();
  const [isAuthenticated, setisAuthenticated] = useState("");
  const UserId = useSelector(getUserId);
  const getUserNick = useSelector(getNickname);
  const currentToken = useSelector(getToken);

  const dispatch = useDispatch();

  useEffect(() => {
    setisAuthenticated(currentToken);
  }, [currentToken]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser(isAuthenticated));
      const roomId = localStorage.getItem("roomId");
      roomId !== null && dispatch(setRoomId(roomId));
    }
    setisAuthenticated(currentToken);
  }, [isAuthenticated]);

  useEffect(() => {
    const checkUsers = (userNick) => {
      if (currentToken) {
        getUserNick && dispatch(getUsers(currentToken));
      }
    };
    socket.on("user:login", checkUsers);
    socket.on("user:logout", checkUsers);
    return () => {
      socket.removeListener("user:login", checkUsers);
      socket.removeListener("user:logout", checkUsers);
    };
  }, [getUserNick]);

  return (
    <Section>
      <div className={!isAuthenticated ? "AppUnlogged" : "AppLogged"}>
        <>
          {!isAuthenticated && <Route path="/" component={MainMenu} />}
          {!isAuthenticated && <Route exact path="/" component={LoginPanel} />}
          <Switch>
            <Redirect from="/null" to="/" />
            {!isAuthenticated && (
              <Route
                exact
                path="/login"
                component={LoginPanel}
                redirectTo="/"
              />
            )}
            {!isAuthenticated && (
              <Route
                exact
                path="/register"
                component={RegisterPanel}
                redirectTo="/"
              />
            )}
            {isAuthenticated && (
              <>
                {history.push(`/${getUserNick}`)}
                <div className="headerContainer">
                  <Logo />
                  <LogOut id={UserId} />
                </div>
                <div className="ChatListWrapper">
                  <ChatList />
                  <Route path="/" component={Chat} redirectTo="/" />
                </div>
              </>
            )}
          </Switch>
        </>
        {!isAuthenticated && (
          <div className="MainPageImageWrapperForDesktop">
            <MainPageImage />
          </div>
        )}
      </div>
    </Section>
  );
}

export default App;
