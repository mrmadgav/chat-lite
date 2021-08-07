// import { NavLink } from "react-router-dom";
import styles from "./RegisterPanel.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/Auth/Auth-operations";
import { useHistory } from "react-router-dom";

export default function LoginPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

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
            type="tel"
            placeholder="Pass"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
            value={password}
            onChange={updatePassword}
            className={styles.contactInput}
          />
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
            required
          />
        </label>
        <button
          type="submit"
          className={styles.contactBtn}
          // onClick={registerUser}
        >
          Register
        </button>
      </form>
    </div>
  );
}
