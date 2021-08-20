import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUser } from "../../Redux/selectors";
import { socket } from "../helpers/io";
import authActions from "../../Redux/Auth/Auth-actions";
import axios from "axios";

import styles from "./ChatList.module.css";
import { setRoomId } from "../../Redux/Chat/Chat-operations";

export default function ChatList() {
  const getUserId = useSelector(getUser);
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();

  // Функционал личных сообщений
  //начать диалог (создать комнату)
  const beginPrivateDialog = (event) => {
    const getUserIdForRoom = (i) => {
      if (i.nickname === event.target.innerHTML) return i._id;
    };
    const roomId = getUserId + allUsers.filter(getUserIdForRoom)[0]._id;
    dispatch(setRoomId(roomId));
    localStorage.setItem("roomId", roomId);
  };
  //закончить диалог (по клику на общий чат)
  const endPrivateDialog = () => {
    dispatch(setRoomId(""));
    localStorage.removeItem("roomId");
  };
  // Функционал личных сообщений

  // useEffect(() => {
  //   const getUsersFromServer = async () => {
  //     const users = await axios.get("/users");
  //     dispatch(authActions.getUsersSuccess(users.data));
  //   };

  //   socket.on("user:login", getUsersFromServer);
  //   return () => {
  //     socket.removeListener("user:login", getUsersFromServer);
  //   };
  // }, [allUsers]);

  const addActiveClass = (e) => {
    if (e.target.tagName === "SPAN") {
      for (let i = 0; i < e.currentTarget.childNodes.length; i++) {
        e.currentTarget.childNodes[i].childNodes[0].classList.remove(
          `${styles.active}`
        );
      }
      e.target.classList.add(`${styles.active}`);
    }
  };

  return (
    <div className={styles.ChatListWrapper}>
      <span className={styles.ChatListTitle}>OnLine</span>
      <ul
        className={`${styles.ChatListUl} ${styles.scrollbarFrozenDreams}`}
        onClick={addActiveClass}
      >
        <li>
          <span className={styles.ChatListElement} onClick={endPrivateDialog}>
            All Users
          </span>
        </li>
        {allUsers &&
          allUsers.map((i) => {
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
