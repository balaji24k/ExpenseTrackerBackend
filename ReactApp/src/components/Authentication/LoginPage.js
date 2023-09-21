import React, { useContext, useState } from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(email,password) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/user/login`,{
        method: "POST",
        body: JSON.stringify({email,password}),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }
      const data = await response.json();
      // console.log(data,"login");
      authCtx.login(data.token,data.name);
      history.replace('/expenses');
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  return (
    <section className={classes.box}>
      <h1>Login</h1>
      <LoginForm isLoading={isLoading} submitHandler={submitHandler} />
    </section>
  );
};

export default LoginPage;
