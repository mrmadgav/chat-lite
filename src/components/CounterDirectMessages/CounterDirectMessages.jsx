import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRoomId, getUserId } from "../../Redux/selectors";
import { socket } from "../helpers/io";
import styles from "./CounterDirectMessages.module.css";

export default function CounterDirectMessages(props) {
  const currentRoomId = useSelector(getRoomId);
  const UserId = useSelector(getUserId);
  const [counter, setCounter] = useState(0);
  const [itemId, setItemId] = useState("");

  function reverseRoomId(roomId) {
    const firstPart = roomId.substr(0, roomId.length / 2);
    const secondPart = roomId.substr(roomId.length / 2);
    let newStr = [secondPart, firstPart].join("");
    return newStr;
  }

  useEffect(() => {
    setItemId(props.id);
    socket.on("privateMessage:fromServer", (id) => {
      console.log("Пришло сообщение с сервера");
      if (id.includes(UserId)) {
        if (
          id?.includes(props.id) &&
          id !== (currentRoomId && reverseRoomId(currentRoomId))
        ) {
          document
            .getElementById(`${props.id}`)
            .classList.remove(`${styles.hidden}`);
          setCounter(counter + 1);
        }
      }
    });

    if (currentRoomId.includes(props.id)) {
      document.getElementById(`${props.id}`)?.classList.add(`${styles.hidden}`);
      setCounter(0);
    }
    // return () => {
    //   socket.removeListener("privateMessage:fromServer");
    // };
  }, [counter, currentRoomId, itemId, props.id]);

  return (
    <span className={`${styles.counter} ${styles.hidden}`} id={`${itemId}`}>
      {counter}
    </span>
  );
}
