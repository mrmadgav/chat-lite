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
    return () => {
      dispatch(fetchHistory());

      const getMessageFromServer = (id) => {
        const newArray = message.filter((item) => {
          return item.id !== id;
        });
        setMessage([...newArray]);
      };
      socket.on("DeletingMessage", getMessageFromServer);
      return () => {
        socket.removeListener("DeletingMessage", getMessageFromServer);
      };
    };
  }, [deletedMessage]);

  // socket.on("user send message", () => {
  //   dispatch(fetchHistory()).then(() => scrollToBottom());
  //   socket.removeListener("user send message", fetchHistory);
  //   socket.removeListener("user send message", scrollToBottom);
  //   // socket.removeAllListeners(["message:fromServer"]);
  // });

  socket.on("message:fromServer", () => {
    dispatch(fetchHistory()).then(() => scrollToBottom());
    // socket.removeListener("message:fromServer");

    socket.removeAllListeners(["message:fromServer"]);
  });

  socket.on("User edit message", () => {
    dispatch(fetchHistory());
    socket.removeListener("User edit message");
  });

  socket.on("message:delete", () => {
    dispatch(fetchHistory());
    socket.removeListener("message:delete");
  });

  useEffect(() => {
    scrollToBottom();

    const userTyping = (data) => {
      setTyping(true);
      setUserTyping(data);
    };
    socket.on("userTyping", userTyping);
    socket.on("userStoppedTyping", setTyping(false));
    return () => {
      socket.removeListener("userTyping", userTyping);
      socket.removeListener("userStoppedTyping", setTyping);
    };
  }, [message]);

  const scrollToBottom = () => {
    // var block = document.getElementById("block");
    // block.scrollTop = block.scrollHeight;
    // messagesEndRef.current?.scrollHeight();
    window.scrollTo(0, messagesEndRef.current?.offsetTop);
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    // window.scrollTo(0, messagesEndRef.current?.offsetTop);
  };
  useEffect(() => {
    dispatch(fetchHistory()).then(() => scrollToBottom());
  }, []);

  const handleToUpdate = (id) => {
    setDeletedMessage(id);
  };
  const onChangeMenu = (id) => {
    setchangeMenu(!changeMenu);
    scrollToBottom();
    setEditMessageID(id);
  };

  return (
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
      {changeMenu && (
        <ChangeMenu EditMessageID={EditMessageID} onChangeMenu={onChangeMenu} />
      )}
      {typing && <span>{userTyping} is typing...</span>}
      <div id="bottom" ref={messagesEndRef} />
    </div>
  );
}
