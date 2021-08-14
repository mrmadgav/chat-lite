import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendImg } from "../../Redux/Auth/Auth-operations";
import { getToken } from "../../Redux/Auth/Auth-selectors";
import styles from "./UploadImg.module.css";
import download from "../../img/download.png";

export default function UploadImg() {
  const fileImg = useRef();
  const currentToken = useSelector(getToken);
  //   const getImgUrl = useSelector(getImgUrl);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(sendImg(e.target.files[0], currentToken));
  };

  return (
    <>
      <button
        type="button"
        className={styles.avatarChoose}
        onClick={() => fileImg.current.click()}
      >
        <div className={styles.avatarContainer}>
          <img src={download} className={styles.download} alt="" />
        </div>
      </button>
      <input
        ref={fileImg}
        onChange={(e) => handleChange(e)}
        multiple={false}
        encType="multipart/form-data"
        type="file"
        hidden
      />
    </>
  );
}
