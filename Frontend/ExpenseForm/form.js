let token;
window.addEventListener("DOMContentLoaded", async() => {
  try{
    const userName = localStorage.getItem("name");
    token = localStorage.getItem("token");
    if (!userName || !token) {
      window.location.href = "../Login/login.html";
    };
    document.getElementById("userName").innerText = `User: ${userName}`;
    const res = await axios.get("http://localhost:3000/expenses",{
      headers : {"Authorization": token}
    })
    // console.log(res, "after refresh");
    if (res.status === 200) {
      res.data.forEach(data => showExpenses(data));
    }
    else {
      throw new Error(res.err);
    }
  }
  catch(err) {
      alert(err);
  }
});

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

      alert("You are a Premium User now!")
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
        console.log(data, "id before condition")
        if (id) {
            const response = await axios.put(`http://localhost:3000/expenses/${id}`, {
                expense : expense,
                category : category,
                price : price
            }, {
              headers : {"Authorization": token}
            })
            console.log(response.data,"put")
            if (response.status === 200) {
                clearFields();
                showExpenses(response.data);
            }
            else {
                throw new Error(response)
            }
            return;
        }
        console.log(token,".before post")
        const response = await axios.post("http://localhost:3000/expenses",data,{
          headers : {"Authorization": token}
        });
        console.log(response.data,"post");
        if (response.status === 200) {
            clearFields();
            showExpenses(response.data);
        }
        else {
            throw new Error(response.data.error)
        }
    }
    catch(err) {
      console.log(err,"error")
        alert(err);
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
  
