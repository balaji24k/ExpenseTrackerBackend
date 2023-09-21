import { useContext, useEffect, useState } from "react";
import classes from "./ShowExpenses.module.css";
import { Button } from "react-bootstrap";
import ExpenseContext from "../../store/ExpenseContext";
import AuthContext from "../../store/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ShowExpenses = () => {
  const history = useHistory();
  const expenseCtx = useContext(ExpenseContext);
  const {expenses,replaceExpenses, editExpenseHandler} = expenseCtx;
  console.log("exp in s/how",expenses)
  const {updatePremium, logout} = useContext(AuthContext);

  const [totalExpensesCount,setTotalExpensesCount] = useState(0);
  // console.log(totalExpensesCount,"totalExpensesCount")
  const [numberOfRows, setNumberOfRows] = useState(+localStorage.getItem("numberOfRows") || 5);
  const [currPage,setCurrPage] = useState(+localStorage.getItem('currpage') || 1);
  const lastpage = Math.ceil(totalExpensesCount/numberOfRows);
  
  useEffect(() => {
    const fetchData = async() => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_API}/expenses?numberOfRows=${numberOfRows}&currPage=${currPage}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": token
          },
        });

        if(!response.ok) {
          const error = await response.json();
          console.log(error,"err in refresh");
          history.replace("/");
          logout();
          alert(error.message || "Something went wrong");
        }
        const data = await response.json();
        // console.log(data,"show exp useeff");
        replaceExpenses(data.expenses);
        setTotalExpensesCount(data.totalExpensesCount);

        if (data.user.isPremiumUser) {
          updatePremium();
        }
      } catch (error) {
        console.log(error,"show exp useeff")
      }
    }
    fetchData();
  }, [numberOfRows,currPage,replaceExpenses,updatePremium,logout,history]);

  const changePage = (page)=> {
    localStorage.setItem('currpage',page);
    setCurrPage(page);
  };

  const numberOfRowsHandler = (event) => {
    // console.log("numOfRows",event.target.value)
    localStorage.setItem("numberOfRows",event.target.value)
    setNumberOfRows(+event.target.value)
  };

  return (
    <div className={classes.box}>
      <div className={classes.rowBox} >
        <label>
          Rows Per Page:
          <select 
            value={numberOfRows} 
            onChange={numberOfRowsHandler}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </label>
        <h2 className={classes.heading} >Expenses</h2>
      </div>
      {expenses.length === 0 && <h6 className={classes.text} >No Expenses!</h6>}
      {expenses.length > 0 &&
        expenses.slice(0, numberOfRows).map(expense => 
          <div key={expense.id} className={classes.expense}>
            <h5>{expense.expense}</h5>
            <h5>{expense.category}</h5>
            <h5>{expense.price}</h5>
            <Button 
              className={classes.button}
              onClick={editExpenseHandler.bind(null, expense)}
            >
              Edit
            </Button>
            <Button
              className={classes.button}
              variant="danger"
              onClick={expenseCtx.removeExpense.bind(null, expense.id)}
            >
              Remove
            </Button>
          </div>
        )
      }
      {expenses.length > 0 && <div className={classes.buttonContainer}>
        {currPage>1 && <Button 
          onClick={changePage.bind(null,currPage-1)}
          className={classes.button}>
            {currPage-1}
        </Button>}
        <Button 
          variant="success" 
          className={classes.button}>
            {currPage}
        </Button>
        {currPage < lastpage &&  <Button 
          onClick={changePage.bind(null,currPage+1)} 
          className={classes.button}>
            {currPage+1}
        </Button>}.................
        <Button
          onClick={changePage.bind(null,lastpage)} 
          className={classes.button}
        >
          {lastpage}
        </Button>
      </div>}
    </div>  
  );
};

export default ShowExpenses;