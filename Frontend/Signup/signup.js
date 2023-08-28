const url = "http://localhost:3000/users";

const signup = async (event) => {
  event.preventDefault();
  try {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if(name.trim().length === 0) {
      alert("Enter valid Name");
    }

    const enteredDetails = { name, email, password };
    console.log(enteredDetails)

    const response = await axios.post(`${url}/signup`, enteredDetails);
    console.log(response.data);
    if (response.data.success) {
      window.location.href = "../Login/login.html";
    }
    else {
      throw new Error(response.data.error)
    }
  } 
  catch(error) {
    document.body.innerHTML += `<div style="color:red;" >${error}</div>` 
  }
	
};
