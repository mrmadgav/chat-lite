import React, { Component } from "react";
import styles from "./Section.module.css";

class Section extends Component {
  render() {
    return (
      <div className={styles.container}>
        <>{this.props.children}</>
      </div>
    );
  }
}

export default Section;
