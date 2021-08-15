import React from "react";
import catTyping from "../../img/fatCat.gif"
import styles from "./MainPageImage.module.css";

export default function MainPageImage() {
  return (
    <div>
      <img className={styles.fatCatImg} src={catTyping} alt="" />
    </div>
  );
}
