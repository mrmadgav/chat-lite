import React from "react";
import { useState } from "react";
import styles from "./Message.module.css";
import { useSelector } from "react-redux";
import { getAllUsers, getNickname } from "../../Redux/selectors";
import MessageMenu from "../MessageMenu/MessageMenu";

export default function Message(content) {
  const userNick = useSelector(getNickname);
  const allUsers = useSelector(getAllUsers);
  const msgUserAvaUrl = () => {
    allUsers.filter(currentMessageAuthor);
  };
  function currentMessageAuthor(i) {
    console.log("THIS");
    return i.nickname === content.nickname && i.urlAvatar;
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const sendAnchor = (anchorEl) => {
    setAnchorEl(anchorEl);
  };

  return (
    <>
      <div
        className={
          userNick === content.nick
            ? styles.sentMessageMy
            : styles.sentMessageOther
        }
        onClick={
          userNick === content.nick
            ? (event) => {
                !event.target.dataset.type
                  ? setAnchorEl(event.currentTarget)
                  : content.handleModal(event.target.src);
              }
            : (event) => {
                event.target.dataset.type &&
                  content.handleModal(event.target.src);
              }
        }
      >
        {
          <>
            <img src={msgUserAvaUrl} alt="" className={styles.avatar}></img>
            <span>{`${content.nick}: `}</span>
            <span>
              {content.content.includes(".jpg") ||
              content.content.includes(".svg") ||
              content.content.includes(".png") ||
              content.content.includes(".gif") ||
              content.content.includes(".webp") ? (
                <img src={content.content} data-type="IMG" alt=""></img>
              ) : (
                content.content
              )}
            </span>
          </>
        }
        <span className={styles.messageTime}>{content.date}</span>
        <MessageMenu
          id={content.id}
          anchorEl={anchorEl}
          sendAnchor={sendAnchor}
          handleToUpdate={content.handleToUpdate}
          onChangeMenu={content.onChangeMenu}
          getCopiedMessage={content.getCopiedMessage}
        />
      </div>
    </>
  );
}
