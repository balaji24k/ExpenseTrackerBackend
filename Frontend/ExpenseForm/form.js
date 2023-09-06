let token;
window.addEventListener("DOMContentLoaded", async() => {
  try{
    const userName = localStorage.getItem("name");
    token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:3000/expenses",{
      headers : {"Authorization": token}
    })
    document.getElementById("userName").innerText = `User: ${userName}`;
    const data = res.data;
    if(data.user.isPremiumUser) {
      updatePremElement();
    }
    console.log(data, "after refresh");
    data.expenses.forEach(expense => showExpenses(expense));
  }
  catch(err) {
      console.log(err.response.data,"errrrrr");
      alert(err.response.data.message);
      logoutHandler();
  }
});

const logoutHandler = () => {
  localStorage.clear();
  window.location.href = "../Login/login.html";
}

const updatePremElement = () => {
  const premElement = document.getElementById("premiumElement");
  premElement.innerHTML = 
    `<h3>You are Primium User</h3> 
    <button id="showPremBtn" isVisible="visible" onclick="showLeaderBoard()">Show Leaderboard</button>`
}

const showLeaderBoard = async() => {
  const button = document.getElementById("showPremBtn");
  const parent = document.getElementById("leaderboard");
  console.log(button.getAttribute("isVisible"),"in  showleaderboadr")
  if(button.getAttribute("isVisible") === "visible") {
    const res = await axios.get("http://localhost:3000/premium/showLeaderboard",{
      headers : {"Authorization": token}
    })
    parent.innerHTML += `<h2>Leaderboard</h2>`
    console.log(res.data, "showLeaderBoard");
    res.data.forEach(exp => {
      parent.innerHTML += `<li>Name: ${exp.name} - Spent: \u20B9${exp.totalSpent}</li>`
    })
    button.innerText = "Hide Leaderboard";
    button.setAttribute("isVisible","hidden");
  }
  else {
    parent.innerHTML = "";
    button.innerText = "Show Leaderboard";
    button.setAttribute("isVisible","visible");
  }
}

const buyPrimium = async(event) => {
  const response = await axios.get("http://localhost:3000/purchase/buyPrimium",{
    headers : {"Authorization": token}
  })
  console.log(response.razorpay_payment_id,"buyprem");
  const options = {
    "key" : response.data.key_id,
    "order_id": response.data.order.id,
    "handler" : async(response) => {
      await axios.post("http://localhost:3000/purchase/updatePremium", {
        order_id: options.order_id,
        payment_id: response.razorpay_payment_id,
      },{headers : {"Authorization": token}})

      alert("You are a Premium User now!");
      updatePremElement();
    }
  }
  const rzp1 = new Razorpay(options);
  rzp1.open();
  event.preventDefault();

  rzp1.on('payment.failed', (response) => {
    console.log(response,"payment failed!");
    axios.post("http://localhost:3000/purchase/updateFailedOrder", {
      order_id: options.order_id
    },{headers : {"Authorization": token}});
    alert("Payment Failed , Something went Wrong!");
  });
}
  
const clearFields = () => {
  document.getElementById("id").value = "";
  document.getElementById("expense").value = "";
  document.getElementById("category").value = "";
  document.getElementById("price").value = "";
}
  
const addExpense = async(event) => {
  try {
    event.preventDefault();
    // console.log(event.target)
    const id = event.target.id.value;
    const expense = event.target.expense.value;
    const category = event.target.category.value;
    const price = event.target.price.value;

    console.log(id,"id 32")

    const data = { expense, category, price };
    // console.log(data, "id before condition")
    if (id) {
      const prevExpensePrice = document.getElementById("prevExpensePrice").value
      const response = await axios.put(`http://localhost:3000/expenses/${id}`, {
          expense : expense,
          category : category,
          price : price,
          prevExpensePrice : prevExpensePrice
      }, {
        headers : {"Authorization": token}
      })
      console.log(response.data,"data put")
      clearFields();
      showExpenses(response.data);
      return;
    }
    console.log(token,".before post")
    const response = await axios.post("http://localhost:3000/expenses",data,{
      headers : {"Authorization": token}
    });
    console.log(response.data,"data post");
    clearFields();
    showExpenses(response.data);
  }
  catch(err) {
    console.log(err,"error")
    alert(err.response.data.message);
  }
};
  
const showExpenses = data => {
  const parent = document.getElementById("list");
  const child = 
    `<li id=${data.id}>
      ${data.expense} -- ${data.category} -- ${data.price}
      <button onclick=editHandler('${data.id}','${data.category}','${data.expense}','${data.price}')>
        Edit
      </button>
      <button onclick=deleteHandler('${data.id}')>
        Delete
      </button>
    </li>`;
  parent.innerHTML = parent.innerHTML + child;
};
  
const editHandler = (id, category, expense, price) => {
  console.log(id,category,expense,price, "edit")
  document.getElementById("id").value = id;
  document.getElementById("prevExpensePrice").value = price;
  document.getElementById("expense").value = expense;
  document.getElementById("category").value = category;
  document.getElementById("price").value = price;
  removeFromScreen(id);
};
  
const deleteHandler = (id) => {
  removeFromScreen(id);
  axios.delete(`http://localhost:3000/expenses/${id}`, {
    headers : {"Authorization": token}
  }).then((res) => {
      console.log(res.data, "delete req");
  });
};
  
const removeFromScreen = (id) => {
  const parent = document.getElementById("list");
  const child = document.getElementById(id);
  parent.removeChild(child);
};
  
