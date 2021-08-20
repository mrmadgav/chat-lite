import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// socket
import { socket } from "../helpers/io";
//operations
import { sendImg } from "../../Redux/Auth/Auth-operations";
import {
  fetchHistory,
  fetchPrivateHistory,
} from "../../Redux/Chat/Chat-operations";
//selectors
import { filterValue, getAllUsers, getRoomId } from "../../Redux/selectors";
import { getHistory, getPrivateHistory } from "../../Redux/selectors";
import { getToken } from "../../Redux/Auth/Auth-selectors";
//components
import Message from "../Message/Message";
import ChangeMenu from "../ChangeMenu/ChangeMenu";
import Modal from "../Modal/Modal";
//styles
import styles from "./MessageFlow.module.css";
//other
import { nanoid } from "nanoid";

export default React.memo(MessageFlow);
function MessageFlow(props) {
  //dispatch
  const dispatch = useDispatch();
  //states
  const [modal, setModal] = useState(false);
  const [modalSrc, setModalSrc] = useState("");
  const [EditMessageID, setEditMessageID] = useState(null);
  const [typing, setTyping] = useState(false);
  const [userTyping, setUserTyping] = useState([]);
  const [deletedMessage, setDeletedMessage] = useState("");
  const [changeMenu, setchangeMenu] = useState(false);
  //refs
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  // selectors
  const allHistory = useSelector(getHistory);
  const privateHistory = useSelector(getPrivateHistory);
  const filter = useSelector(filterValue);
  const currentToken = useSelector(getToken);
  const allUsers = useSelector(getAllUsers);
  const currentRoomId = useSelector(getRoomId);

  //Use Effects
  useEffect(() => {
    allUsers.length > 1 && (chatRef.current.scrollTop = 999999999999999);
    return () => {
      // console.log("Анмаунт юзэффекта от всех юзеров");
    };
  }, [allUsers]);

  useEffect(() => {
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

  let memoizedFetchHistory = useMemo(() => fetchHistory(), []);

  useEffect(() => {
    chatRef.current.scrollTop = 999999999999999;
    currentRoomId
      ? dispatch(fetchPrivateHistory(currentRoomId))
      : dispatch(memoizedFetchHistory);

    socket.on("privateMessage:fromServer", (id, nickname) => {
      (id === currentRoomId) | (id === reverseRoomId(currentRoomId)) &&
        dispatch(fetchPrivateHistory(id)).then(() => scrollToBottom());
      if (id !== (currentRoomId && reverseRoomId(currentRoomId))) {
        window.innerWidth >= 320
          ? new Notification(`New message from ${nickname}`)
          : !("Notification" in window)
          ? Notification.requestPermission()
          : console.log("Уведомления запрещены в браузере");
      }
    });

    return () => {
      socket.removeListener("privateMessage:fromServer");
    };
  }, [currentRoomId]);

  //functions
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
    let newStr = [secondPart, firstPart].join("");
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
  //Drag & Drop end

  return (
    <div className={styles.chatWrapper}>
      <div
        className="dropzone"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <div
          className={`${styles.chatDiv} ${styles.scrollbarFrozenDreams}`}
          ref={chatRef}
        >
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
