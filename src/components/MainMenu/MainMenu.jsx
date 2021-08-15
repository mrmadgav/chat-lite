import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";
import Logo from "../Logo/Logo";
import MainPageImage from "../MainPageImage/MainPageImage";

const MainMenu = () => {
  return (
    <div className={styles.MainHeaderWrapper}>
      <Logo />
      <div className={styles.MainPageImageWrapperForMobile}>
        <MainPageImage />
      </div>

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
    </div>
  );
};
export default MainMenu;
