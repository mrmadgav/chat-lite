import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserId } from "../../Redux/selectors";
import { setRoomId } from "../../Redux/Chat/Chat-operations";
import CounterDirectMessages from "../CounterDirectMessages/CounterDirectMessages";
import styles from "./ChatList.module.css";

export default function ChatList() {
  const UserId = useSelector(getUserId);
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentActiveChat = localStorage.getItem("activeChat");
    if (allUsers) {
      currentActiveChat &&
        document
          .getElementById(`${currentActiveChat}`)
          ?.classList.add(`${styles.active}`);
    }
  }, [allUsers]);

  // Функционал личных сообщений
  //начать диалог (создать комнату)
  const beginPrivateDialog = (event) => {
    const getUserIdForRoom = (i) => {
      if (i.nickname === event.target.innerHTML) return i._id;
    };
    const roomId = UserId + allUsers.filter(getUserIdForRoom)[0]._id;
    dispatch(setRoomId(roomId));
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("activeChat", event.target.id);
  };
  //закончить диалог (по клику на общий чат)
  const endPrivateDialog = () => {
    dispatch(setRoomId(""));
    localStorage.removeItem("roomId");
    localStorage.setItem("activeChat", "allUsers");
  };
  // ------------ //

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
          <span className={styles.ChatListElement} id="allUsers" onClick={endPrivateDialog}>
            All Users
          </span>
        </li>
        {allUsers &&
          allUsers.map((i) => {
            if (i.isOnline) {
              return (
                <li className={styles.ChatListLI}>
                  <span
                    className={styles.ChatListElement}
                    onClick={beginPrivateDialog}
                    id={i.nickname}
                  >
                    {i.nickname}
                  </span>
                  {i._id !== UserId && <CounterDirectMessages id={i._id} />}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
