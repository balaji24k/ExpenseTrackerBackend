import React, { useRef, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./Auth.module.css";

const ForgotPassword = () => {
	const emailRef = useRef();

	const [isLoading, setIsLoading] = useState(false);

	const forgotPasswordHandler = async(event) => {
		try { 
			setIsLoading(true);
			event.preventDefault();
			const email = emailRef.current.value;
			console.log(email,"email")
			const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/password/forgotPassword`,{
        method: "POST",
        body: JSON.stringify({email}),
        headers: {
          "Content-Type": "application/json",
        },
      })
			console.log(response,"forgot pass");
			setIsLoading(false);
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
					<Button type="submit">
						{isLoading ?   
							<span>
								Sending...
								<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
							</span>
							: 
							'Send'
						}
					</Button>
					<NavLink to="/login">
							Go back to Login?
					</NavLink>
				</div>
			</Form>
		</div>
  )
}

export default ForgotPassword