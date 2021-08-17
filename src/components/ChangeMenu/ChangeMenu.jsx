import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHistory,
  getPrivateHistory,
  getRoomId,
} from "../../Redux/selectors";
import { sendUpdatedMessage } from "../../Redux/Chat/Chat-operations";
import { useEffect } from "react";
import acceptSVG from "../../img/accept.svg";
import styles from "./ChangeMenu.module.css";
import { socket } from "../helpers/io";

export default function ChangeMenu(props) {
  const [updatedMessage, setupdatedMessage] = useState("");
  const RoomId = useSelector(getRoomId);

  const dispatch = useDispatch();

  const History = useSelector(!RoomId ? getHistory : getPrivateHistory);

  const value = History.filter((i) => i.id === props.EditMessageID.id);
  const [restValue] = value;

  useEffect((e) => {
    setupdatedMessage(restValue.text);
  }, []);

  const updateMessage = (evt) => {
    setupdatedMessage(evt.target.value);
  };

  const sendChanges = () => {
    dispatch(
      sendUpdatedMessage({
        id: restValue.id,
        text: updatedMessage,
        roomId: props.roomId,
      })
    ).then(() => socket.emit("message:edited"));
    props.onChangeMenu();
    console.log("Эмитим сообщение на сервак");
  };

  return (
    <div>
      <input
        type="text"
        value={updatedMessage}
        onChange={updateMessage}
        ref={(input) => input && input.focus()}
        className={styles.updateMessageImput}
      />
      <button type="button" onClick={sendChanges} className={styles.acceptBtn}>
        <img src={acceptSVG} alt="" className={styles.acceptIMG} />
      </button>
    </div>
  );
}
