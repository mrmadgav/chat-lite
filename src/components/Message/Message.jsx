import React from "react";
import { useState } from "react";
import styles from "./Message.module.css";
import { useSelector } from "react-redux";
import { getNickname } from "../../Redux/selectors";

import MessageMenu from "../MessageMenu/MessageMenu";

export default function Message(content) {
  const userNick = useSelector(getNickname);
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
                console.log(event.target);
                console.log(event.target === !"IMG");
                console.log(event.target === !"img");
                event.target === !"IMG" && setAnchorEl(event.currentTarget);
              }
            : () => {
                console.log("Кликнули на картинку");
              }
        }
      >
        {
          <>
            <span>{`${content.nick} :`}</span>
            <span>
              {content.content.includes(".jpg") ||
              content.content.includes(".svg") ||
              content.content.includes(".png") ||
              content.content.includes(".gif") ||
              content.content.includes(".webp") ? (
                <img src={content.content}></img>
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
