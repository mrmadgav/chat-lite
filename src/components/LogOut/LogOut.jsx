import React, { useRef } from "react";
import { logout, sendAvatar } from "../../Redux/Auth/Auth-operations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getNickname, getAvatar, getUser } from "../../Redux/selectors";
import styles from "./LogOut.module.css";
import anonym from "../../img/anonymGit.png";
import { getToken } from "../../Redux/Auth/Auth-selectors";

export default function LogOut() {
  const nickName = useSelector(getNickname);
  const fileInputRef = useRef();
  const currentToken = useSelector(getToken);
  const currentUserId = useSelector(getUser);
  const getAvatarUrl = useSelector(getAvatar);
  console.log(getAvatarUrl);
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(currentUserId, currentToken));
  };
  const handleChange = (e) => {
    console.log(e.target.files[0]);
    dispatch(sendAvatar(e.target.files[0], currentToken));
  };

  return (
    <div className={styles.logOutHeader}>
      <button
        type="button"
        className={styles.avatarChoose}
        onClick={() => fileInputRef.current.click()}
      >
        <img
          src={getAvatarUrl ? getAvatarUrl : anonym}
          className={getAvatarUrl ? styles.userAva : styles.anonym}
          alt=""
        />
      </button>
      <input
        ref={fileInputRef}
        onChange={(e) => handleChange(e)}
        multiple={false}
        encType="multipart/form-data"
        type="file"
        hidden
      />
      <span className={styles.NickName}>{nickName}</span>
      <button onClick={handleLogout} className={styles.logOutBtn}>
        Logout
      </button>
    </div>
  );
}
