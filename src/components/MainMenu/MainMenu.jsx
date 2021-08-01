import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";

const MainMenu = () => {
  return (
    <div className={styles.MenuContainer}>
      <ul className={styles.MainBar}>
        <li className={styles.navLi}>
          <NavLink
            exact
            to="/register"
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
          >
            Register
          </NavLink>
        </li>
        <li className={styles.navLink}>
          <NavLink
            exact
            to="/login"
            className={styles.NavLink}
            activeClassName={styles.NavLinkActive}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default MainMenu;
