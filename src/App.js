import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/Routes/PrivateRoute";
import { socket } from "./components/helpers/io";
import { createBrowserHistory } from "history";

//Operations
import { getUser } from "./Redux/Auth/Auth-operations";
import { sendUserList } from "./Redux/Chat/Chat-operations";

//Components
import Section from "../src/components/Section/Section";
import RegisterPanel from "./components/RegisterPanel/RegisterPanel.jsx";
import LoginPanel from "./components/LoginPanel/LoginPanel.jsx";
import Chat from "./components/Chat/Chat";
import MainMenu from "./components/MainMenu/MainMenu";
import LogOut from "./components/LogOut/LogOut";
import ChatList from "./components/ChatList/ChatList";
import MainPageImage from "./MainPageImage/MainPageImage";

//CSS
import "./App.css";
import "./index.css";

// client-side
function App() {
  const history = createBrowserHistory();
  const [isAuthenticated, setisAuthenticated] = useState("");
  const getIsAuthenticated = useSelector((state) => state.authReducer.token);
  const getUserId = useSelector((state) => state.authReducer.user.userId);
  const getUserNick = useSelector((state) => state.authReducer.user.nickname);
  const dispatch = useDispatch();

  useEffect(() => {
    setisAuthenticated(getIsAuthenticated);
  }, [getIsAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser(isAuthenticated));
    }
    setisAuthenticated(getIsAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const userJoin = (data) => {
      dispatch(sendUserList(data));
    };
    socket.on("user:login", userJoin);
    return () => {
      socket.removeListener("user:login", userJoin);
    };
  });
  return (
    <Section>
      <div className={!isAuthenticated ? "AppUnlogged" : "AppLogged"}>
        <>
          {!isAuthenticated && <Route path="/" component={MainMenu} basename="/chat-lite/"/>}
          <Switch>
            {!isAuthenticated && history.push("/")}
            {!isAuthenticated && (
              <Route
                path="/login"
                exact
                component={LoginPanel}
                redirectTo="/"
                basename="/chat-lite/"
              />
            )}
            {!isAuthenticated && (
              <Route
                path="/register"
                exact
                component={RegisterPanel}
                redirectTo="/"
                basename="/chat-lite/"
              />
            )}
            {/* {isAuthenticated && (
              <Route path="/chat" component={Chat} redirectTo="/" />
            )} */}
            {isAuthenticated && (
              <>
                {history.push(`/${getUserNick}`)}
                <LogOut id={getUserId} />
                <div className="ChatListWrapper">
                  <ChatList />
                  <Route path="/" component={Chat} redirectTo="/" basename="/chat-lite/"/>
                </div>
              </>
            )}
          </Switch>
        </>
        {!isAuthenticated && <MainPageImage />}
      </div>
    </Section>
  );
}

export default App;
