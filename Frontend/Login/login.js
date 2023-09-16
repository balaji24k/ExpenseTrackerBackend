const login = async (event) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;
    const enteredDetails = { email, password };
    // console.log(enteredDetails)

    const response = await axios.post("http://localhost:4000/user/login", enteredDetails);
    if (response.status === 200) {
      event.target.email.value = "";
      event.target.password.value = "";
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("name",response.data.name);
      // console.log(response.data,"after login")
      alert(response.data.message);
      window.location.href = "../ExpenseForm/form.html";
    }
  } 
  catch(error) {
    console.log(error.response.data);
    alert(error);
  }
};


const forgotPassword = async(event) => {
  event.preventDefault();
  console.log("forgot")
  try { 
    const email = event.target.email.value;
    const res = await axios.post("http://localhost:4000/password/forgotPassword",{email});
    event.target.email.value = "";
    alert(res.data.message);
  } catch (error) {
    console.log(error.response)
    alert(error.response.data.error);
  }
};
