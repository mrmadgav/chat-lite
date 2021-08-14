import React from "react";
import { useState } from "react";
import { socket } from "../helpers/io";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { fetchHistory } from "../../Redux/Chat/Chat-operations";
import { filterValue } from "../../Redux/selectors";
import styles from "./MessageFlow.module.css";
import { getHistory } from "../../Redux/selectors";
import { useRef } from "react";
import ChangeMenu from "../ChangeMenu/ChangeMenu";

export default function MessageFlow(props) {
  const filter = useSelector(filterValue);
  const [message, setMessage] = useState([]);
  const [EditMessageID, setEditMessageID] = useState(null);
  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState([]);
  const dispatch = useDispatch();
  const allHistory = useSelector(getHistory);
  const messagesEndRef = useRef(null);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [changeMenu, setchangeMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchHistory()).then(() => scrollToBottom());
    console.log("сработал UseEffect");

    socket.on("message:fromServer", () => {
      dispatch(fetchHistory()).then(() => scrollToBottom());
    });

    socket.on("User edit message", () => {
      dispatch(fetchHistory());
    });

    socket.on("DeletingMessage", () => {
      dispatch(fetchHistory());
    });

    const userTyping = (data) => {
      setTyping(true);
      setUserTyping(data);
    };
    socket.on("userTyping", userTyping);
    socket.on("userStoppedTyping", setTyping(false));
  }, []);

  const scrollToBottom = () => {
    console.log("произошел скролл");
    console.log(messagesEndRef.current);
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleToUpdate = (id) => {
    setDeletedMessage(id);
  };
  const onChangeMenu = (id) => {
    setchangeMenu(!changeMenu);
    scrollToBottom();
    setEditMessageID(id);
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={`${styles.chatDiv} ${styles.scrollbarFrozenDreams}`}>
        {allHistory &&
          allHistory.map((i) => {
            if (i.text.toLowerCase().includes(filter.toLowerCase())) {
              return (
                <Message
                  content={i.text}
                  nick={i.nickname}
                  date={i.date}
                  id={i.id}
                  key={nanoid()}
                  handleToUpdate={handleToUpdate}
                  onChangeMenu={onChangeMenu}
                  getCopiedMessage={props.getCopiedMessage}
                />
              );
            }
          })}
      </div>
      {changeMenu && (
        <ChangeMenu EditMessageID={EditMessageID} onChangeMenu={onChangeMenu} />
      )}
      {typing && <span>{userTyping} is typing...</span>}
      <div id="bottom" ref={messagesEndRef} />
    </div>
  );
}
