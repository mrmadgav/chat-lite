import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { onFilter } from "../../Redux/Chat/Chat-operations";
import ClearInputButton from "../ClearInputButton/ClearInputButton";
import styles from "./Filter.module.css";

function Filter() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState([]);

  const onHandleFilter = (e) => {
    setFilter(e.target.value);
    dispatch(onFilter(e.target.value));
  };
  return (
    <label className={styles.label}>
      <input
        type="text"
        placeholder="find your message"
        onChange={onHandleFilter}
        className={styles.filterInput}
      />
      {filter && <ClearInputButton />}
    </label>
  );
}

export default Filter;
