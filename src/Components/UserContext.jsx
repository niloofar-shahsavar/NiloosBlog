import { createContext, useState } from "react";
import { createUser, signInUser, signOutUser } from "../firebase/authFunction";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const lsUserName = localStorage.getItem("userName") || null;
  const [userName, setUserName] = useState(lsUserName);

  const lsIsLoggedIn = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(lsIsLoggedIn === "true");

  const register = async (email, password) => {
    const credential = await createUser(email, password);
    afterLogin(credential.user);
  };

  const login = async (email, password) => {
    const credential = await signInUser(email, password);
    afterLogin(credential.user);
  };

  const afterLogin = (user) => {
    const email = user?.email ?? "unknown user";

    setUserName(email);
    localStorage.setItem("userName", email);

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = async () => {
    await signOutUser();

    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");

    setUserName("null");
    localStorage.removeItem("userName");
  };

  const value = {
    userName,
    setUserName,
    isLoggedIn,
    register,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
