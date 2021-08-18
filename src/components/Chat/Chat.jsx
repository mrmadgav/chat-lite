import React, { Suspense } from "react";
import styles from "./Chat.module.css";
import MessageForm from "../MessageForm/MessageForm";
// import MessageFlow from "../MessageFlow/MessageFlow";
import Filter from "../Filter/Filter";
import { useSelector } from "react-redux";

import { useState } from "react";
import {
  getHistory,
  getPrivateHistory,
  getRoomId,
} from "../../Redux/selectors";
import UploadImg from "../UploadImg/UploadImg";
const MessageFlow = React.lazy(() => import("../MessageFlow/MessageFlow"));

export default function Chat(props) {
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
        <Suspense fallback={<div>Загрузка...</div>}>
          <MessageFlow getCopiedMessage={getCopiedMessage} />
        </Suspense>
        <MessageForm copiedMessage={copiedMessage} />
      </div>
    </>
  );
}
