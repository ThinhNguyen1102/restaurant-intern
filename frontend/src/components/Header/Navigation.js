import { Fragment, useContext } from "react";

import AuthContext from "../../store/auth-context";

import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  const authCxt = useContext(AuthContext);

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.links}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          {authCxt.isLoggedIn && (
            <Link to="/restaurants" className={classes.link}>
              Restaurants
            </Link>
          )}
          {authCxt.isLoggedIn && (
            <Link to="/add-restaurant" className={classes.link}>
              Add Restaurants
            </Link>
          )}
          {authCxt.isLoggedIn && (
            <Link to="/about" className={classes.link}>
              About
            </Link>
          )}
        </div>
        <div className={classes.links}>
          {!authCxt.isLoggedIn && (
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          )}
          {authCxt.isLoggedIn && (
            <Link to="/" className={classes.link} onClick={authCxt.onLogout}>
              Logout
            </Link>
          )}
        </div>
      </header>
      <div className={classes.fixed}></div>
    </Fragment>
  );
};

export default Navigation;
