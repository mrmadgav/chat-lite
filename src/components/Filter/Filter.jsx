import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { onFilter } from "../../Redux/Chat/Chat-operations";
import ClearInputButton from "../ClearInputButton/ClearInputButton";
import styles from "./Filter.module.css";

function Filter() {
  const [filter, setFilter] = useState([]);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const onHandleFilter = (e) => {
    setFilter(e.target.value);
    dispatch(onFilter(e.target.value));
  };
  const clearInput = () => {
    setFilter("");
    inputRef.current.value = "";
  };
  return (
    <label className={styles.label}>
      <input
        type="text"
        placeholder="find your message"
        onChange={onHandleFilter}
        className={styles.filterInput}
        ref={inputRef}
      />
      {filter && (
        <ClearInputButton
          setFilter={setFilter}
          inputRef={inputRef}
          clearInput={clearInput}
        />
      )}
    </label>
  );
}

export default Filter;
