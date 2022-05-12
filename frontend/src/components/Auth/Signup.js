import axios from "axios";
import { useCallback, useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

import classes from "./Signup.module.css";

const Signup = (props) => {
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);

  const onRedirectWithSignuped = () => {
    setIsSignupSuccess(true);
  };

  const postSignupUser = useCallback(async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log(formData.get("name"));

    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/auth/signup",
        formData
      );
      console.log(response.data);
      onRedirectWithSignuped();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={classes["form-wrapper"]}>
      {isSignupSuccess && <Navigate to="/login" />}
      <Card>
        <div className={classes.wrapper} onSubmit={postSignupUser}>
          <form className={classes["form-control"]}>
            <Input type="name" name="name" defaultvValue="" title="User Name" />
            <Input type="email" name="email" defaultvValue="" title="E-mail" />
            <Input
              type="password"
              name="password"
              defaultvValue=""
              title="Password"
            />
            <Input
              type="password"
              name="repeatPassword"
              defaultvValue=""
              title="Repeat Password"
            />
            <div className={classes["btn-box"]}>
              <Button>Create User</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
