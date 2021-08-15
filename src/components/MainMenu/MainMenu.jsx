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
             <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 width="50.000000pt" height="50.000000pt" viewBox="0 0 50.000000 50.000000"
 preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
fill="#b3c5d6" stroke="none">
<path d="M202 445 c-17 -8 -37 -26 -42 -40 -14 -36 -6 -134 13 -172 29 -55 23
-70 -38 -99 -58 -28 -85 -55 -85 -86 0 -16 11 -18 110 -18 67 0 110 4 110 10
0 6 -40 10 -100 10 -98 0 -100 1 -90 20 6 11 32 31 58 44 38 19 60 23 120 21
69 -2 99 6 67 19 -20 7 -19 39 3 84 18 37 27 129 16 164 -6 19 -72 58 -96 58
-7 -1 -28 -7 -46 -15z m96 -25 c32 -20 32 -21 30 -85 -2 -36 -6 -65 -10 -65
-5 0 -8 -8 -8 -18 0 -10 -4 -22 -9 -27 -5 -6 -11 -23 -13 -40 -3 -27 -7 -30
-38 -30 -30 0 -35 4 -38 25 -2 14 -11 41 -20 60 -19 41 -26 135 -11 162 21 39
70 47 117 18z"/>
<path d="M368 143 c-51 -53 -78 -89 -83 -111 -12 -59 47 -34 143 61 72 71 83
92 60 115 -23 23 -44 12 -120 -65z m107 46 c11 -17 -1 -21 -15 -4 -8 9 -8 15
-2 15 6 0 14 -5 17 -11z m-69 -88 c-44 -44 -58 -53 -68 -43 -18 18 90 126 109
110 12 -9 4 -22 -41 -67z m-81 -61 c3 -5 1 -10 -4 -10 -6 0 -11 5 -11 10 0 6
2 10 4 10 3 0 8 -4 11 -10z"/>
</g>
</svg>
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
              <object
                type="image/svg+xml"
                data={login}
                className={styles.menuIcon}
                alt="register icon"
              ></object>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default MainMenu;
