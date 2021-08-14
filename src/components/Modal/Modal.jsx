import React, { Component } from "react";
import styles from "./Modal.module.css";

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handlekeydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handlekeydown);
  }
  handlekeydown = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };
  render() {
    return (
      <div className={styles.Overlay} onClick={this.props.toggleModal}>
        <div className={styles.Modal}>
          <img src={this.props.currentImg.largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
