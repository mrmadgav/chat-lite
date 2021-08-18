import styles from "./RegisterPanel.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/Auth/Auth-operations";
import { useHistory } from "react-router-dom";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [PasswordReveal, setPasswordReveal] = useState("false");

  const dispatch = useDispatch();

  const updateEmail = (evt) => {
    setEmail(evt.target.value);
  };
  const updatePassword = (evt) => {
    setPassword(evt.target.value);
  };
  const updateNickname = (evt) => {
    setNickname(evt.target.value);
  };
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ email, password, nickname })).then((response) => {
      history.push("/login");
    });
  };

  const revealPassword = () => {
    setPasswordReveal(!PasswordReveal);
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
            pattern="\A[a-z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_‘{|}~-]+)*@
            (?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\z"
          />
        </label>
        <label className={styles.contactFormTitle}>
          Password &nbsp;
          <input
            name="password"
            type={PasswordReveal ? "password" : "text"}
            placeholder="Pass"
            value={password}
            onChange={updatePassword}
            className={styles.contactInput}
            required
            minlength="8"
          />
          <input
            class={!PasswordReveal ? styles.reveralButton : styles.hideButton}
            type="button"
            value=""
            onClick={revealPassword}
          ></input>
        </label>
        <label className={styles.contactFormTitle}>
          NickName
          <input
            name="nick"
            type="text"
            placeholder="Name"
            className={styles.contactInput}
            value={nickname}
            onChange={updateNickname}
            maxlength="20"
            required
          />
        </label>
        <button type="submit" className={styles.contactBtn}>
          Register
        </button>
      </form>
    </div>
  );
}
