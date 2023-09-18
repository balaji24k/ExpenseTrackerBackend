import React, { useCallback, useState } from "react";

const ExpenseContext = React.createContext({
  downloadList: () => {},
  replaceDownloadList : () => {},
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
  addDownloadedFile:  () => {},
  replaceExpenses : () => {},
  editExpense: null,
  editExpenseHandler : () => {},
  updateExpenseHandler : () => {}
});
export default ExpenseContext;

export const ExpenseProvider = (props) => {
	// const {userName,updatePremium} = useContext(AuthContext)
  const [expenses, setExpenses] = useState([]);
  const [downloadList,setDownloadList] = useState([]);

  const replaceExpenses = useCallback((expenses) => {
    setExpenses(expenses);
  },[]);

  const replaceDownloadList = useCallback((downloadList) => {
    setDownloadList(downloadList);
  }, [])

  const addDownloadedFile = (file) => {
    const dateObj = new Date(file.createdAt);
    const dateString = dateObj.toLocaleDateString();
    const timeString = dateObj.toLocaleTimeString(); 
    const updatedFile = {id:file.id,dateString,timeString,fileUrl:file.fileUrl};
    setDownloadList([updatedFile,...downloadList]);
  }

  const addExpense = async (newExpense) => {
    try {
			const token = localStorage.getItem("token");
      // console.log("newExpense", newExpense);
      const response = await fetch("http://localhost:4000/expenses", {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
					"Authorization": token
        },
      });
      const data = await response.json();
      // console.log("data post req", data);
      setExpenses([data,...expenses]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeExpense = async(id) => {
    try {
      console.log("remove Exp", id);
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:4000/expenses/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
					"Authorization": token
        },
      });
      const updatedExpenses = expenses.filter((exp) => exp.id !== id);
      setExpenses(updatedExpenses);
    } catch (error) {
      console.log(error,"delete")
    }
  };

  const [editExpense,setEditExpense] = useState(null);

  const editExpenseHandler = (editingExp) => {
    setEditExpense(editingExp);
  }

  const updateExpenseHandler = async(updatingExp) => {
    try {
      const existingExpIndex = expenses.findIndex(exp => exp.id === updatingExp.id);
      const updatedExpenses = [...expenses];
      updatedExpenses[existingExpIndex] = updatingExp;
      setEditExpense(null);
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:4000/expenses/${updatingExp.id}`, {
        method: "PUT",
        body: JSON.stringify(updatingExp),
        headers: {
          "Content-Type": "application/json",
					"Authorization": token
        },
      });
      setExpenses(updatedExpenses);
    } catch (error) {
      console.log(error,"update")
    }
  }

  const obj = {
    downloadList,
    replaceDownloadList,
    expenses, 
    addExpense, 
    removeExpense,
    replaceExpenses,
    addDownloadedFile,
    editExpense,
    editExpenseHandler,
    updateExpenseHandler
  }
  return (
    <ExpenseContext.Provider value={obj}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
