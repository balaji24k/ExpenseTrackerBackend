window.addEventListener("DOMContentLoaded", async() => {
    try{
        const res = await axios.get("http://localhost:3000/expenses")
        // console.log(res, "after refresh");
        if (res.status === 200) {
            res.data.forEach(data => showExpenses(data));
        }
        else {
            throw new Error(res.err)
        }
    }
    catch(err) {
        alert(err);
    }
  });
  
  const clearFields = () => {
    document.getElementById("id").value = "";
    document.getElementById("expense").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
  }
  
  const addExpense = async(event) => {
    try {
        event.preventDefault();
        console.log(event.target)
        const id = event.target.id.value;
        const expense = event.target.expense.value;
        const category = event.target.category.value;
        const price = event.target.price.value;

        console.log(id,"id 32")
    
        const data = { expense, category, price };
        // console.log(id, "id before condition")
        if (id) {
            const response = await axios.put(`http://localhost:3000/expenses/${id}`, {
                expense : expense,
                category : category,
                price : price
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
        // console.log("inside post")
        const response = await axios.post("http://localhost:3000/expenses", data);
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
    axios.delete(`http://localhost:3000/expenses/${id}`)
      .then((res) => {
        console.log(res.data, "delete req");
      });
  };
  
  const removeFromScreen = (id) => {
    const parent = document.getElementById("list");
    const child = document.getElementById(id);
    parent.removeChild(child);
  };
  
