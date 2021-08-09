import React, { useRef } from "react";
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

  const messagesEndRef = useRef(null);

  const getCopiedMessage = (id) => {
    const value = allHistory.filter((i) => i.id === id.id);
    const [copiedValue] = value;
    setcopiedMessage(copiedValue);
  };
  const scrollToBottom = () => {
    window.scrollTo(0, messagesEndRef.current?.offsetTop);
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={styles.chatContainer}>
        <span className={styles.chatHeader}>
          <span className={styles.chatWelcome}>Welcome to chat</span> <Filter />
        </span>
        <MessageFlow getCopiedMessage={getCopiedMessage} />
        <div id="bottom" ref={messagesEndRef} />
        <MessageForm
          copiedMessage={copiedMessage}
          scrollToBottom={() => scrollToBottom()}
        />
      </div>
    </>
  );
}
