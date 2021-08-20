import React from "react";
import styles from "./CounterDirectMessages.module.css";

export default function CounterDirectMessages(props) {
  return (
    <span className={`${styles.counter} ${styles.hidden} `}>
      {props.counter}
    </span>
  );
}
