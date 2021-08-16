import React from "react";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import { socket } from "./components/helpers/io";
import { createBrowserHistory } from "history";

//Operations
import { getUser } from "./Redux/Auth/Auth-operations";
import { sendUserList } from "./Redux/Chat/Chat-operations";

//Selectors
import { getAllUsers } from "./Redux/selectors";

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

  const dispatch = useDispatch();

  // Функционал личных сообщений
  const [PrivateDialog, setPrivateDialog] = useState(false);
  const [RoomId, setRoomId] = useState("");

  //начать диалог (создать комнату)
  const beginPrivateDialog = (event) => {
    setPrivateDialog(true);

    const getUserIdForRoom = (i) => {
      if (i.nickname === event.target.innerHTML) return i._id;
    };
    setRoomId(getUserId + getAllUsers.filter(getUserIdForRoom()));
    console.log(RoomId);
  };

  //закончить диалог (по клику на общий чат)
  const endPrivateDialog = () => {
    setPrivateDialog(false);
    console.log("закончили диалог");
  };

  // Функционал личных сообщений

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
                  <ChatList
                    beginPrivateDialog={beginPrivateDialog}
                    endPrivateDialog={endPrivateDialog}
                  />
                  <Route
                    path="/"
                    component={(props) => (
                      <Chat PrivateDialog={PrivateDialog} {...props} />
                    )}
                    redirectTo="/"
                  />
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
