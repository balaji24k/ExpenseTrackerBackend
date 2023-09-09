const url = "http://localhost:3000/user";

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
    // console.log(enteredDetails);

    const response = await axios.post(`${url}/signup`, enteredDetails);
    console.log(response.status === 200);
    if (response.status === 200) {
      window.location.href = "../Login/login.html";
      alert(response.data.message);
    }
    else {
      throw new Error(response.data.error)
    }
  } 
  catch(error) {
    alert(error); 
  }
	
};
