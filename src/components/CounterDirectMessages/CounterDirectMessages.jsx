import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRoomId } from "../../Redux/selectors";
import styles from "./CounterDirectMessages.module.css";
import { socket } from "../helpers/io";

export default function CounterDirectMessages(props) {
  const currentRoomId = useSelector(getRoomId);
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
      if (
        id.includes(props.id) &&
        id !== (currentRoomId && reverseRoomId(currentRoomId))
      ) {
        document
          .getElementById(`${props.id}`)
          .classList.remove(`${styles.hidden}`);
        setCounter(counter + 1);
      } else {
        document
          .getElementById(`${props.id}`)
          .classList.add(`${styles.hidden}`);
        setCounter(0);
      }
    });
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
