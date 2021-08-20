import React from "react";
import acceptSVG from "../../img/accept.svg";
import styles from "./ChangeMenu.module.css";

export default function ClearInputButton() {
  return (
    <button
      type="button"
      onClick={() => (this.value = "")}
      className={styles.acceptBtn}
    >
      <img src={acceptSVG} alt="" className={styles.acceptIMG} />
    </button>
  );
}
