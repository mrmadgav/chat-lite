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
import { getToken } from "./Redux/Auth/Auth-selectors";

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
  const getIsAuthenticated = useSelector((state) => state.authReducer.token);
  const getUserId = useSelector((state) => state.authReducer.user.userId);
  const getUserNick = useSelector((state) => state.authReducer.user.nickname);
  const currentToken = useSelector(getToken);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   Notification.requestPermission();
  //   return () => {};
  // }, []);

  useEffect(() => {
    setisAuthenticated(getIsAuthenticated);
    // window.innerWidth >= 1200
    //   ? new Notification("Hey")
    //   : !("Notification" in window)
    //   ? Notification.requestPermission()
    //   : console.log("Уведомления запрещены в браузере");

    // new Notification("Hey");
    // if (!("Notification" in window)) {
    //   console.log("This browser does not support desktop notification");
    // } else {
    //   Notification.requestPermission();
    // }
  }, [getIsAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser(isAuthenticated));
      const roomId = localStorage.getItem("roomId");
      roomId !== null && dispatch(setRoomId(roomId));
    }
    setisAuthenticated(getIsAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    console.log(currentToken)
    const checkUsers = () => {
      dispatch(getUsers(currentToken));
    };
    socket.on("user:login", checkUsers);
    socket.on("user:logout", checkUsers);
    return () => {
      socket.removeListener("user:login", checkUsers);
      socket.removeListener("user:logout", checkUsers);
    };
  }, [currentToken]);

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
                  <LogOut id={getUserId} />
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
