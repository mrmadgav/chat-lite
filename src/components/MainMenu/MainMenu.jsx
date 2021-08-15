import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";
import Logo from "../Logo/Logo";
import MainPageImage from "../MainPageImage/MainPageImage";
import register from "../../img/register.svg";
import login from "../../img/login.svg";
import { ReactComponent as LoginSVG } from "../../img/login.svg";
import { ReactComponent as RegSVG } from "../../img/register.svg";
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
              <RegSVG
                fill="#8cafcf"
                width="30px"
                height="30px"
                margin-right="10px"
              />
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
              <LoginSVG
                fill="#8cafcf"
                width="30px"
                height="30px"
                margin-right="10px"
              />
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MainMenu;
