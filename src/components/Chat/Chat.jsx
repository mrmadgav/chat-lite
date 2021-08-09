import React from "react";
import styles from "./Chat.module.css";
import MessageForm from "../MessageForm/MessageForm";
import MessageFlow from "../MessageFlow/MessageFlow";
import Filter from "../Filter/Filter";
import { useSelector } from "react-redux";

import { useState } from "react";
import { getHistory } from "../../Redux/selectors";

export default function Chat() {
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
        </span>
        <MessageFlow getCopiedMessage={getCopiedMessage} />        
        <MessageForm
          copiedMessage={copiedMessage}          
        />
      </div>
    </>
  );
}
