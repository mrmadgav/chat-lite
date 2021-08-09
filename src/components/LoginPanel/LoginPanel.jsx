import styles from "./LoginPanel.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Auth/Auth-operations";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const updateEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const updatePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className={styles.formRegContainer}>
      <form onSubmit={handleSubmit} className={styles.formLabel}>
        <label className={styles.contactFormTitle}>
          Your Email
          <input
            name="email"
            type="text"
            placeholder="Email"
            className={styles.contactInput}
            value={email}
            onChange={updateEmail}
            required
          />
        </label>
        <label className={styles.contactFormTitle}>
          Password &nbsp;
          <input
            name="number"
            type="password"
            placeholder="Pass"
            value={password}
            onChange={updatePassword}
            className={styles.contactInput}
          />
        </label>
        <button type="submit" className={styles.contactBtn}>
          LogIn
        </button>
      </form>
    </div>
  );
}
