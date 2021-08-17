import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/selectors";
import { socket } from "../helpers/io";
import authActions from "../../Redux/Auth/Auth-actions";
import axios from "axios";
import { setRoomId } from "./Redux/Chat/Chat-operations";
import styles from "./ChatList.module.css";

export default function ChatList() {
  const UserList = useSelector(getAllUsers);
  const getUserId = useSelector((state) => state.authReducer.user.userId);
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();

  // Функционал личных сообщений
  //начать диалог (создать комнату)
  const beginPrivateDialog = (event) => {
    const getUserIdForRoom = (i) => {
      if (i.nickname === event.target.innerHTML) return i._id;
    };

    dispatch(setRoomId(getUserId + allUsers.filter(getUserIdForRoom)[0]._id));
  };
  //закончить диалог (по клику на общий чат)
  const endPrivateDialog = () => {
    dispatch(setRoomId(null));
    console.log("закончили диалог");
  };
  // Функционал личных сообщений

  useEffect(() => {
    const getUsersFromServer = async () => {
      const users = await axios.get("/users");
      dispatch(authActions.getUsersSuccess(users.data));
    };

    socket.on("user:login", getUsersFromServer);
    return () => {
      socket.removeListener("user:login", getUsersFromServer);
    };
  }, [UserList]);

  return (
    <div className={styles.ChatListWrapper}>
      <span className={styles.ChatListTitle}>OnLine</span>
      <ul className={`${styles.ChatListUl} ${styles.scrollbarFrozenDreams}`}>
        <li>
          <span className={styles.ChatListElement} onClick={endPrivateDialog}>
            Общий чат
          </span>
        </li>
        {UserList &&
          UserList.map((i) => {
            if (i.isOnline) {
              return (
                <li>
                  <span
                    className={styles.ChatListElement}
                    onClick={beginPrivateDialog}
                  >
                    {i.nickname}
                  </span>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
