import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getNickname } from "../../Redux/selectors";
import MessageMenu from "../MessageMenu/MessageMenu";
import anonym from "../../img/anonymGit.png";
import styles from "./Message.module.css";

export default function Message(content) {
  const userNick = useSelector(getNickname);
  const [anchorEl, setAnchorEl] = useState(null);

  const sendAnchor = (anchorEl) => {
    setAnchorEl(anchorEl);
  };

  return (
    <>
      <div className={styles.messageWrapper}>
        <img
          src={
            content.avatarUrl[0].urlAvatar
              ? content.avatarUrl[0].urlAvatar.replace(
                  "c_fill,w_150,h_150",
                  "c_fill,w_50,h_50"
                )
              : anonym
          }
          alt=""
          className={styles.avatar}
        ></img>
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
      </div>
    </>
  );
}
