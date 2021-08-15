import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/selectors";
import { socket } from "../helpers/io";
import authActions from "../../Redux/Auth/Auth-actions";
import axios from "axios";
import styles from "./ChatList.module.css";

export default function ChatList() {
  const UserList = useSelector(getAllUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsersFromServer = async () => {
      console.log("Сработал UseEffect в ChatList");
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
        {UserList &&
          UserList.map((i) => {
            if (i.isOnline) {
              return (
                <li>
                  <span className={styles.ChatListElement}>{i.nickname}</span>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}
