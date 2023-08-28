const login = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;

  const enteredDetails = { email, password };
  console.log(enteredDetails)
};
