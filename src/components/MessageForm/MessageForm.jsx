import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../Redux/Chat/Chat-operations";
import { getNickname } from "../../Redux/selectors";
import { getToken } from "../../Redux/Auth/Auth-selectors";
import { socket } from "../helpers/io";
import sendImg from "../../img/paws.png";
import smile from "../../img/smile.svg";
import Picker from "emoji-picker-react";
import { nanoid } from "nanoid";
import styles from "./MessageForm.module.css";
import { useRef } from "react";

import { notice, defaultModules } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";
import { useEffect } from "react";

defaultModules.set(PNotifyMobile, {});

export default function MessageForm(props) {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const currentToken = useSelector(getToken);
  const nickname = useSelector(getNickname);
  const [picker, setPicker] = useState(false);

  useEffect(() => {
    props.copiedMessage.text && setMessage(props.copiedMessage.text);
  }, [props]);

  const updateMessage = (evt) => {
    setMessage(evt.target.value);
  };

  const ref = useRef(null);
  const onEmojiClick = (event, emojiObject) => {
    const cursor = ref.current.selectionStart;
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor);
    setMessage(text);
  };
  const openPicker = () => {
    setPicker(!picker);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = nanoid();
    if (message) {
      socket.emit("message:send", {
        nickname: nickname,
        text: message,
        id: id,
      });
      dispatch(
        sendMessage(
          {
            nickname: nickname,
            text: message,
            id: id,
          },
          currentToken
        )
      );
      setMessage("");
      setPicker(false);
    } else {
      notice({
        text: "Агрессивное молчание не принесет тебе удовлетворения",
        styling: "brighttheme",
        delay: 2000,
      });
    }
  };

  const userTyping = (e) => {
    let timeout = setTimeout(3000, socket.emit("stopTyping"));
    if (e.which !== 13) {
      socket.emit("typing", { user: nickname, typing: true });
    } else {
      clearTimeout(timeout);
    }
    clearTimeout(timeout);
  };

  return (
    <>
      <div className={styles.messageInputContainer}>
        <form
          onKeyDown={() => setPicker(false)}
          className={styles.messageInputForm}
        >
          {picker && (
            <Picker
              onEmojiClick={onEmojiClick}
              disableSearchBar={true}
              pickerStyle={{
                position: "absolute",
                right: "100%",
                bottom: "50%",
              }}
            />
          )}
          <button
            type="button"
            className={styles.messageSmileBtn}
            onClick={openPicker}
          >
            <img src={smile} alt="" className={styles.smileImg} />
          </button>
          <input
            type="text"
            ref={ref}
            value={message}
            onChange={updateMessage}
            onKeyPress={userTyping}
            required
            className={styles.messageInput}
            placeholder="Type message to send"
          />
          <button
            type="submit"
            className={styles.messageAddBtn}
            onClick={handleSubmit}
          >
            <img src={sendImg} alt="" className={styles.sendImg} />
          </button>
        </form>
      </div>
    </>
  );
}
