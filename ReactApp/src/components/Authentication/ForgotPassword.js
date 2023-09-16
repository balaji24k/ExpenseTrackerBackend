import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./Auth.module.css";

const ForgotPassword = () => {
	const emailRef = useRef();

	const forgotPasswordHandler = async(event) => {
		try { 
			event.preventDefault();
			const email = emailRef.current.value;
			console.log(email,"email")
			const response = await fetch("http://localhost:4000/password/forgotPassword",{
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "Content-Type": "application/json",
        },
      })
			console.log(response,"forgot pass");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }
			alert("Main sent!");
		} catch (error) {
			console.log(error)
			alert("something went wrong!");
		}
	}
  return (
		<div className={classes.box} >
			<Form onSubmit={forgotPasswordHandler}>
				<Form.Group className="mb-3">
					<Form.Label>Email:</Form.Label>
					<Form.Control type="text" placeholder="Email" ref={emailRef} />
				</Form.Group>
				<div className={classes.button} >
					<Button type="submit">Send Mail</Button>
					<NavLink to="/login">
							Go back to Login?
					</NavLink>
				</div>
			</Form>
		</div>
  )
}

export default ForgotPassword