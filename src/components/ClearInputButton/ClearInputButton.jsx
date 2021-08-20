import React from "react";
import clearSVG from "../../img/clear.png";
import styles from "./ClearInputButton.module.css";

export default function ClearInputButton(props) {
  return (
    <button
      type="button"
      onClick={() => props.clearInput()}
      className={styles.clearBtn}
    >
      <img src={clearSVG} alt="" className={styles.clearIMG} />
    </button>
  );
}
