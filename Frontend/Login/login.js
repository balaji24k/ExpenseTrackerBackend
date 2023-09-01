const url = "http://localhost:3000/user";

const login = async (event) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;

    const enteredDetails = { email, password };
    // console.log(enteredDetails)

    const response = await axios.post(`${url}/login`, enteredDetails);
    console.log(response.data);
    if (response.status === 200) {
      event.target.email.value = "";
      event.target.password.value = "";
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("name",response.data.name);
      alert(response.data.message);
      window.location.href = "../ExpenseForm/form.html";
    }
    else {
      throw new Error(response.data.error)
    }
  } 
  catch(error) {
    console.log(error.config)
    alert(error);
  }
	
};
