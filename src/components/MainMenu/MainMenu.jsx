import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainMenu.module.css";
import Logo from "../Logo/Logo";
import MainPageImage from "../MainPageImage/MainPageImage";
import { useDispatch, useSelector } from "react-redux";
import { getError } from "../../Redux/selectors";
import authActions from "../../Redux/Auth/Auth-actions";
import { ReactComponent as LoginSVG } from "../../img/login.svg";
import { ReactComponent as RegSVG } from "../../img/register.svg";

import { alert, defaultModules } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import * as PNotifyMobile from "@pnotify/mobile";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/BrightTheme.css";

defaultModules.set(PNotifyMobile, { maxTextHeight: null });
defaultModules.maxTextHeight = null;

const MainMenu = () => {
  const currentError = useSelector(getError);
  const dispatch = useDispatch();
  useEffect(() => {
    currentError &&
      alert({
        text: currentError,
        styling: "brighttheme",
        delay: 1000,
        killer: true,
      });

    setTimeout(() => {
      dispatch(authActions.mainMenuError(""));
    }, 1500);
  }, [currentError]);

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
                margin-right="10"
              />
              Register
            </NavLink>
          </li>
          <li className={styles.navLi}>
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
                margin-right="10"
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
