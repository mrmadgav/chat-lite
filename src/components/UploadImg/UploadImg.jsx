import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendImg } from "../../Redux/Chat/Chat-operations";
import { getToken, getRoomId } from "../../Redux/selectors";

import styles from "./UploadImg.module.css";
import download from "../../img/download.png";

export default function UploadImg() {
  const fileImg = useRef();
  const currentToken = useSelector(getToken);
  const roomId = useSelector(getRoomId);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(sendImg(e.target.files[0], currentToken, roomId));
  };

  return (
    <>
      <button
        type="button"
        className={styles.uploadBtn}
        onClick={() => fileImg.current.click()}
      >
        <div>
          <img src={download} className={styles.uploadImg} alt="" />
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
