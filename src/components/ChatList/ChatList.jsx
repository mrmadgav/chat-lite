import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getRoomId, getUser } from "../../Redux/selectors";

import styles from "./ChatList.module.css";
import { setRoomId } from "../../Redux/Chat/Chat-operations";
import CounterDirectMessages from "../CounterDirectMessages/CounterDirectMessages";
import { socket } from "../helpers/io";

export default function ChatList() {
  const [counter, setCounter] = useState(0);

  const getUserId = useSelector(getUser);
  const allUsers = useSelector(getAllUsers);
  const dispatch = useDispatch();
  const currentRoomId = useSelector(getRoomId);

  // useEffect(() => {
  //   socket.on("privateMessage:fromServer", (id) => {
  //     (id !== currentRoomId && id !== reverseRoomId(currentRoomId)) && setCounter(counter++)}
  //   return () => {}
  // }, [])

  function reverseRoomId(roomId) {
    const firstPart = roomId.substr(0, roomId.length / 2);
    const secondPart = roomId.substr(roomId.length / 2);
    let newStr = [secondPart, firstPart].join("");
    return newStr;
  }

  useEffect(() => {
    console.log("сработал UseEffect");
    socket.on("privateMessage:fromServer", (id) => {
      id !== currentRoomId &&
        id !== reverseRoomId(currentRoomId) &&
        setCounter(counter + 1);
    });
    return () => {
      socket.removeListener("privateMessage:fromServer");
    };
  }, [counter, currentRoomId]);

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
                <li className={styles.ChatListLI}>
                  <span
                    className={styles.ChatListElement}
                    onClick={beginPrivateDialog}
                  >
                    {i.nickname}
                    <CounterDirectMessages counter={counter} />
                  </span>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
