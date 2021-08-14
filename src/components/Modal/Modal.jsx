import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  const [Modal, setModal] = useState(true);

  useEffect(() => {
    console.log("Маунт Модалки");
    window.addEventListener("keydown", props.handlekeydown);
    return () => {
      window.removeEventListener("keydown", props.handlekeydown);
    };
  }, []);

  return (
    <div className={styles.Overlay} onClick={props.toggleModal}>
      <div className={styles.Modal}>
        <img src={props.imgUrl} alt="" />
      </div>
    </div>
  );
}
