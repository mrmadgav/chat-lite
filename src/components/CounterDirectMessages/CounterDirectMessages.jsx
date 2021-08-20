import React from "react";
import styles from "./CounterDirectMessages.module.css";

export default function CounterDirectMessages() {
  return <span className={`${styles.counter} ${styles.hidden} `}>5</span>;
}
