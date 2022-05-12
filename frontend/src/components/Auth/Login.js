import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import AuthContext from "../../store/auth-context";

import { Navigate } from "react-router-dom";

import classes from "./Login.module.css";
import { useState, useCallback, useContext } from "react";
import axios from "axios";

const Login = () => {
  const [isSignupRedirect, setIsSignupRedirect] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const authCxt = useContext(AuthContext);

  const onSignupPageRedirect = (e) => {
    e.preventDefault();
    setIsSignupRedirect(true);
  };

  const onRedirectWithLoggedIn = () => {
    setIsLoginSuccess(true);
  };

  const onLoginhandler = useCallback(
    async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/login",
          formData
        );
        console.log(authCxt.onLogin);
        authCxt.onLogin(response.data.token);
        onRedirectWithLoggedIn();
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className={classes["form-wrapper"]}>
      {isSignupRedirect && <Navigate to="/signup" />}
      {isLoginSuccess && <Navigate to="/" />}
      <Card>
        <div className={classes.wrapper}>
          <form className={classes["form-control"]} onSubmit={onLoginhandler}>
            <Input type="email" name="email" defaultvValue="" title="E-mail" />
            <Input
              type="password"
              name="password"
              defaultvValue=""
              title="Password"
            />
            <div className={classes["btn-box"]}>
              <Button type="submit">Login</Button>
              <div className={classes["signup-wrapper"]}>
                <label>Do not have an account?</label>
                <Button onClick={onSignupPageRedirect}>Signup</Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
