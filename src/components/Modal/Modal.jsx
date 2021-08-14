import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  function handlekeydown(e) {
    if (e.code === "Escape") {
      console.log("вызван handlekeydown");
      console.log(props);
      props.toggleModal();
    }
  }

  useEffect(() => {
    console.log("Маунт Модалки");
    window.addEventListener("keydown", handlekeydown);
    return () => {
      window.removeEventListener("keydown", handlekeydown);
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
