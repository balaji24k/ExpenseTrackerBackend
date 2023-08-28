const url = "http://localhost:3000/user";

const login = async (event) => {
  event.preventDefault();
  try {
    const email = event.target.email.value;
    const password = event.target.password.value;

    const enteredDetails = { email, password };
    console.log(enteredDetails)

    const response = await axios.post(`${url}/login`, enteredDetails);
    console.log(response.data);
    if (response.data.success) {
      // window.location.href = "../Login/login.html";
      alert("Login success!")
    }
    else {
      throw new Error(response.data.error)
    }
  } 
  catch(error) {
    document.body.innerHTML += `<div style="color:red;" >${error}</div>` 
  }
	
};
