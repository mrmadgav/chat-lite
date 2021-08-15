import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";
import Logo from "../Logo/Logo";
import MainPageImage from "../MainPageImage/MainPageImage";
import register from "../../img/register.svg";
import login from "../../img/login.svg";

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
              <object
                type="image/svg+xml"
                data={register}
                className={styles.menuIcon}
              ></object>
              {/* <img src={register} alt="" className={styles.menuIcon}></img> */}
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
              <img src={login} alt="" className={styles.menuIcon}></img>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MainMenu;
