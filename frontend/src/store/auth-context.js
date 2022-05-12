import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (token) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(false);

  useEffect(() => {
    const storeUserLoggedInInformation = localStorage.getItem("JWTtoken");

    if (storeUserLoggedInInformation) {
      setToken(storeUserLoggedInInformation);
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("JWTtoken");
    setToken("");
    setIsLoggedIn(false);
  };

  const loginHandler = (tokenRes) => {
    console.log("owkia");
    localStorage.setItem("JWTtoken", tokenRes);
    setToken(tokenRes);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
