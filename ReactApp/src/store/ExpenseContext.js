import React, { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const ExpenseContext = React.createContext({
  downloadList: () => {},
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
  addDownloadedFile:  () => {}
});
export default ExpenseContext;

export const ExpenseProvider = (props) => {
	const {userName,updatePremium} = useContext(AuthContext)
  const [expenses, setExpenses] = useState([]);
  const [downloadList,setDownloadList] = useState([]);

	useEffect(() => {
		const fetchData = async() => {
			try {
				const token = localStorage.getItem("token");
				if(!userName || !token) {
					return;
				}
				const response = await fetch("http://localhost:4000/expenses", {
					headers: {
						"Content-Type": "application/json",
						"Authorization": token
					},
				});
				const data = await response.json();

        const fileResponse = await fetch("http://localhost:4000/premium/getDownloadList", {
					headers: {
						"Content-Type": "application/json",
						"Authorization": token
					},
				});
        const fileData = await fileResponse.json();

        const updatedFileData = []
        fileData.forEach(file => {
          const dateObj = new Date(file.createdAt);
          const dateString = dateObj.toLocaleDateString();
          const timeString = dateObj.toLocaleTimeString(); 
          const updatedFile = {id:file.id,dateString,timeString,fileUrl:file.fileUrl};
          updatedFileData.push(updatedFile);
        });

				if(data.user.isPremiumUser) {
					updatePremium();
				}
        setDownloadList(updatedFileData);
				setExpenses(data.expenses);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData()
	},[userName,updatePremium]);

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
      console.log("newExpense", newExpense);
      const response = await fetch("http://localhost:4000/expenses", {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
					"Authorization": token
        },
      });
      const data = await response.json();
      console.log("data post req", data);
      setExpenses([...expenses,data]);
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

  return (
    <ExpenseContext.Provider value={{
      addDownloadedFile,downloadList, expenses, addExpense, removeExpense 
    }}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
