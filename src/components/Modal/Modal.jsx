import React, { Component } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal(props) {
  const [Modal, setModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", this.handlekeydown);
    return () => {
      window.removeEventListener("keydown", this.handlekeydown);
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
