import { createContext, useState } from "react";
import { createUser, signInUser, signOutUser } from "../firebase/authFunction";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const lsUserName = localStorage.getItem("userName");
  const [userName, setUserName] = useState(lsUserName);

  const lsIsLoggedIn = localStorage.getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(lsIsLoggedIn);

  const register = async (email, password) => {
    const credential = await createUser(email, password);
    afterLogin(email, password);
  };

  const login = async (email, password) => {
    const credential = await signInUser(email, password);

    afterLogin(email, password);
  };

  const afterLogin = async (email, password) => {
    setUserName(email);
    localStorage.setItem("userName", email);

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  const logout = async () => {
    await signOutUser();

    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");

    setUserName("please log in");
    localStorage.removeItem("userName");
  };

  const useInApp = {
    userName,
    setUserName,
    isLoggedIn,
    register,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={useInApp}>
      {props.children}
    </UserContext.Provider>
  );
};
