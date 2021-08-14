import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  const [Modal, setModal] = useState(true);

  useEffect(() => {
    console.log("Маунт Модалки");
    window.addEventListener("keydown", handlekeydown);
    return () => {
      window.removeEventListener("keydown", handlekeydown);
    };
  }, []);

  function toggleModal() {
    setModal(!Modal);
  }

  function handlekeydown(e) {
    if (e.code === "Escape") {
      toggleModal();
    }
  }

  return (
    <div className={styles.Overlay} onClick={toggleModal}>
      <div className={styles.Modal}>
        <img src={props.imgUrl} alt="" />
      </div>
    </div>
  );
}