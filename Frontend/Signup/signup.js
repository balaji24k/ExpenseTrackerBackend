const url = "http://localhost:3000/onlineShop";

const signup = (event) => {
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const password = event.target.password.value;

	if(name.trim().length === 0) {
		alert("Enter valid Name");
	}

  const enteredDetails = { name, email, password };
	console.log(enteredDetails)

  axios.post(url, enteredDetails)
		.then((result) => {
			window.location.href = "../Login/login.html";
		}).catch((err) => {
			
		});
};
