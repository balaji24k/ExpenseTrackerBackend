const login = async (event) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;

    const enteredDetails = { email, password };
    // console.log(enteredDetails)

    const response = await axios.post("http://localhost:3000/user/login", enteredDetails);
    console.log(response.data);
    if (response.status === 200) {
      event.target.email.value = "";
      event.target.password.value = "";
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("name",response.data.name);
      console.log(response.data,"after login")
      alert(response.data.message);
      window.location.href = "../ExpenseForm/form.html";
    }
    else {
      throw new Error(response.data.error)
    }
  } 
  catch(error) {
    console.log(error.response.data)
    alert(error.response.data.error);
  }
};


const forgotPassword = async(event) => {
  event.preventDefault();
  console.log("forgot")
  try { 
    const email = event.target.email.value;
    const res = await axios.post("http://localhost:3000/password/forgotPassword",{email});
    event.target.email.value = "";
    alert("Email sent!")
  } catch (error) {
    console.log(error.response)
    alert(error.response.data.error);
  }
};
