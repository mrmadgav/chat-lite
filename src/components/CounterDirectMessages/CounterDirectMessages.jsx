import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getRoomId } from "../../Redux/selectors";
import styles from "./CounterDirectMessages.module.css";
import { socket } from "../helpers/io";

export default function CounterDirectMessages(props) {
  const currentRoomId = useSelector(getRoomId);
  const [counter, setCounter] = useState(0);
  const [itemId, setItemId] = useState("");
  const counterRef = useRef(null);

  function reverseRoomId(roomId) {
    const firstPart = roomId.substr(0, roomId.length / 2);
    const secondPart = roomId.substr(roomId.length / 2);
    let newStr = [secondPart, firstPart].join("");
    return newStr;
  }

  useEffect(() => {
    setItemId(props.id);
    return () => {};
  }, []);

  useEffect(() => {
    console.log("сработал UseEffect");
    socket.on("privateMessage:fromServer", (id) => {
      id !== (currentRoomId && reverseRoomId(currentRoomId)) &&
        id.includes(itemId) &&
        setCounter(counter + 1);
    });
    return () => {
      socket.removeListener("privateMessage:fromServer");
    };
  }, [counter, currentRoomId]);

  return (
    <span className={`${styles.counter} ${styles.hidden}`} ref={counterRef}>
      {counter}
    </span>
  );
}
