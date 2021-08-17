import React from "react";
import styles from "./Chat.module.css";
import MessageForm from "../MessageForm/MessageForm";
import MessageFlow from "../MessageFlow/MessageFlow";
import Filter from "../Filter/Filter";
import { useSelector } from "react-redux";

import { useState } from "react";
import { getHistory } from "../../Redux/selectors";
import UploadImg from "../UploadImg/UploadImg";

export default function Chat(props) {
  const [copiedMessage, setcopiedMessage] = useState("");

  const allHistory = useSelector(getHistory);

  const getCopiedMessage = (id) => {
    const value = allHistory.filter((i) => i.id === id.id);
    const [copiedValue] = value;
    setcopiedMessage(copiedValue);
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <span className={styles.chatHeader}>
          <span className={styles.chatWelcome}>Welcome to chat</span> <Filter />
          <UploadImg />
        </span>
        <MessageFlow
          getCopiedMessage={getCopiedMessage}
          PrivateDialog={props.PrivateDialog}
          RoomId={props.RoomId}
        />
        <MessageForm copiedMessage={copiedMessage} RoomId={props.RoomId} />
      </div>
    </>
  );
}
