import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  getHistory,
  getPrivateHistory,
  getRoomId,
} from "../../Redux/selectors";

import MessageForm from "../MessageForm/MessageForm";
import MessageFlow from "../MessageFlow/MessageFlow";
import Filter from "../Filter/Filter";
import UploadImg from "../UploadImg/UploadImg";

import styles from "./Chat.module.css";

export default function Chat() {
  const [copiedMessage, setcopiedMessage] = useState("");
  const roomId = useSelector(getRoomId);
  const History = useSelector(getHistory);
  const PrivateHistory = useSelector(getPrivateHistory);

  const getCopiedMessage = (id) => {
    const value = !roomId
      ? History
      : PrivateHistory.filter((i) => i.id === id.id);
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
        <MessageFlow getCopiedMessage={getCopiedMessage} />
        <MessageForm copiedMessage={copiedMessage} />
      </div>
    </>
  );
}
