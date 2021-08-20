import React from "react";
import acceptSVG from "../../img/accept.svg";
import styles from "./ClearInputButton.module.css";

export default function ClearInputButton(props) {
  return (
    <button
      type="button"
      onClick={() => props.clearInput()}
      className={styles.acceptBtn}
    >
      <img src={acceptSVG} alt="" className={styles.acceptIMG} />
    </button>
  );
}
