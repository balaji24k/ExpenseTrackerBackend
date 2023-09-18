import React, { useCallback } from "react";
import { useState } from "react";

const AuthContext = React.createContext({
  userEmail: "",
  login: () => {},
  logout: () => {},
  updatePremium : () => {},
  isPremiumUser : false,
  isLoggedIn: false,
});
export default AuthContext;

export const AuthProvider = (props) => {
  const [userName, setuserName] = useState(localStorage.getItem("userName"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const isLoggedIn = !!token;

  const login = (token, userName) => {
    // console.log(token, userName, "in login handler authctx");
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setToken(token);
    setuserName(userName);
  };

  const logout = useCallback(() => {
    setToken(null);
    setuserName(null);
    localStorage.clear();
  },[]);

  const updatePremium = useCallback(() => {
    setIsPremiumUser(true);
  },[]);

  const obj = {userName,login,logout,isLoggedIn,updatePremium,isPremiumUser};
  return (
    <AuthContext.Provider value={obj}>
        {props.children}
    </AuthContext.Provider>
  );
};
