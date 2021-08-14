import React, { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  function handlekeydown(e) {
    if (e.code === "Escape") {
      props.toggleModal();
    }
  }
  const largeImgUrl = props.imgUrl.replace("c_fill,w_300/", "");

  useEffect(() => {
    window.addEventListener("keydown", handlekeydown);
    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };
  }, []);

  return (
    <div className={styles.Overlay} onClick={props.toggleModal}>
      <div className={styles.Modal}>
        <img src={largeImgUrl} alt="" />
      </div>
    </div>
  );
}
