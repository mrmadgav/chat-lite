import React from "react";
import { useState } from "react";
import { socket } from "../helpers/io";
import Message from "../Message/Message";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import {
  fetchHistory,
  fetchPrivateHistory,
} from "../../Redux/Chat/Chat-operations";
import {
  filterValue,
  getAllUsers,
  getRoomId,
  getUser,
} from "../../Redux/selectors";
import styles from "./MessageFlow.module.css";
import { getHistory, getPrivateHistory } from "../../Redux/selectors";
import { useRef } from "react";
import ChangeMenu from "../ChangeMenu/ChangeMenu";
import Modal from "../Modal/Modal";
import { sendImg } from "../../Redux/Auth/Auth-operations";
import { getToken } from "../../Redux/Auth/Auth-selectors";

export default function MessageFlow(props) {
  const [modal, setModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const filter = useSelector(filterValue);
  const [EditMessageID, setEditMessageID] = useState(null);
  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState([]);
  const dispatch = useDispatch();
  const allHistory = useSelector(getHistory);
  const privateHistory = useSelector(getPrivateHistory);
  const messagesEndRef = useRef(null);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [changeMenu, setchangeMenu] = useState(false);
  const currentToken = useSelector(getToken);
  const allUsers = useSelector(getAllUsers);
  const currentUser = useSelector(getUser);
  const currentRoomId = useSelector(getRoomId);

  useEffect(() => {
    allUsers.length > 1 && scrollToBottom();
    return () => {
      // console.log("Анмаунт юзэффекта от всех юзеров");
    };
  }, [allUsers]);

  // useEffect(() => {
  //   console.log("Сработал UseEffect от RoomID");
  //   currentRoomId &&
  //     dispatch(fetchPrivateHistory(currentRoomId)).then(() => scrollToBottom());
  // }, [currentRoomId, dispatch]);

  useEffect(() => {
    currentRoomId
      ? dispatch(fetchPrivateHistory(currentRoomId)).then(() =>
          scrollToBottom()
        )
      : dispatch(fetchHistory()).then(() => scrollToBottom());
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

    socket.on("user:join", (socketId) => {
      // socket.to(socket.id).emit("connect to room", socketId);
      socket.emit("connect to room", socket.id + socketId);
    });
  }, []);

  useEffect(() => {
    console.log("сработал useEffect от айдишника комнаты");
    socket.on("privateMessage:fromServer", (id) => {
      console.log("id private msg", id);
      console.log("currentRoomId", currentRoomId);
      id === currentRoomId
        ? dispatch(fetchPrivateHistory(currentRoomId)).then(() =>
            scrollToBottom()
          )
        : id === reverseRoomId(currentRoomId) &&
          dispatch(fetchPrivateHistory(currentRoomId)).then(() =>
            scrollToBottom()
          );
    });
    return () => {
      socket.removeListener("privateMessage:fromServer");
    };
  }, [currentRoomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
    messagesEndRef.current?.focus();
  };

  const handleToUpdate = (id) => {
    setDeletedMessage(id);
  };
  const onChangeMenu = (id) => {
    setchangeMenu(!changeMenu);
    scrollToBottom();
    setEditMessageID(id);
  };
  const handleModal = (src) => {
    setModal(!modal);
    setModalSrc(src);
  };
  function toggleModal() {
    setModal(!modal);
  }
  function reverseRoomId(roomId) {
    const firstPart = roomId.substr(0, roomId.length / 2);
    const secondPart = roomId.substr(roomId.length / 2);
    const newStr = [secondPart, firstPart].join("");
    return newStr;
  }

  //Drag & Drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.dataTransfer.setData("IMG", e.target.dataTransfer.files);
    e.dataTransfer.effectAllowed = "all";
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    dispatch(sendImg(e.dataTransfer.files[0], currentToken, currentRoomId));
  };
  //Drag & Drop

  return (
    <div className={styles.chatWrapper}>
      <div
        className="dropzone"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <div className={`${styles.chatDiv} ${styles.scrollbarFrozenDreams}`}>
          {allUsers.length > 1 &&
            (!currentRoomId ? allHistory : privateHistory).map((i) => {
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
                    handleModal={handleModal}
                    avatarUrl={allUsers.filter(
                      (j) => j.nickname === i.nickname
                    )}
                  />
                );
              }
            })}
          <div id="bottom" ref={messagesEndRef} />
          <div className="draggable-container">
            <input
              type="file"
              className="file-browser-input"
              name="file-browser-input"
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
      {changeMenu && (
        <ChangeMenu EditMessageID={EditMessageID} onChangeMenu={onChangeMenu} />
      )}
      {typing && <span>{userTyping} is typing...</span>}
      {modal && <Modal imgUrl={modalSrc} toggleModal={toggleModal} />}
    </div>
  );
}
