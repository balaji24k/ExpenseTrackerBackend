import { useState } from "react";
import classes from "./Auth.module.css";
import { useHistory } from "react-router-dom";
import SignUpForm from "./SignupForm";

const SignUpPage = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(name,email,password) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:4000/user/signup",{
        method: "POST",
        body: JSON.stringify({name,email,password}),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }
      history.replace('/login');
      alert("Accouct Created Succesfully!")
    } 
    catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };
  return (
    <section className={classes.box}>
      <h1>SignUp</h1>
      <SignUpForm submitHandler={submitHandler} isLoading={isLoading} />
    </section>
  );
};
export default SignUpPage;