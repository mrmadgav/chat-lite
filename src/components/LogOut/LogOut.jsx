import React, { useRef } from "react";
import { logout, sendAvatar } from "../../Redux/Auth/Auth-operations";
import { useDispatch, useSelector } from "react-redux";
import { getNickname, getAvatar, getUserId, getToken } from "../../Redux/selectors";
import anonym from "../../img/anonymGit.png";
import logOut from "../../img/exit.svg";
import { useHistory } from "react-router-dom";
import styles from "./LogOut.module.css";

export default function LogOut() {
  const nickName = useSelector(getNickname);
  const fileInputRef = useRef();
  const currentToken = useSelector(getToken);
  const UserId = useSelector(getUserId);
  const getAvatarUrl = useSelector(getAvatar);

  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout(UserId, currentToken)).then(() => history.push("/"));
  };
  const handleChange = (e) => {
    dispatch(sendAvatar(e.target.files[0], currentToken));
  };

  return (
    <div className={styles.logOutHeader}>
      <button
        type="button"
        className={styles.avatarChoose}
        onClick={() => fileInputRef.current.click()}
      >
        <div className={styles.avatarContainer}>
          <img
            src={getAvatarUrl ? getAvatarUrl : anonym}
            className={getAvatarUrl ? styles.userAva : styles.anonym}
            alt=""
          />
        </div>
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
        <img src={logOut} alt="" className={styles.logOutImg} />
      </button>
    </div>
  );
}
