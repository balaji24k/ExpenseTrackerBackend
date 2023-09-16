import { useContext, useState } from "react";
import classes from "./ShowExpenses.module.css";
import { Button } from "react-bootstrap";
import ExpenseContext from "../../store/ExpenseContext";

const ShowExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  const {expenses} = expenseCtx;

  const maxCount = 5;
  const [start,setStart] = useState(0);
  const [currPage,setCurrPage] = useState(1);
  const lastpage = Math.ceil(expenses.length/maxCount);

  const openPage = (page)=> {
    setStart((page-1)*maxCount);
    setCurrPage(page);
  };

  return (
    <div className={classes.box}>
      <h2 className={classes.text}>Expenses</h2>
      {expenses.length === 0 && <h6 className={classes.text} >No Expenses!</h6>}
      {expenses.length > 0 &&
        expenses.slice(start,start+maxCount).map(expense => 
          <div key={expense.id} className={classes.expense}>
            <h5>{expense.expense}</h5>
            <h5>{expense.category}</h5>
            <h5>{expense.price}</h5>
            <Button 
              className={classes.button}
              // onClick={editExpense.bind(null, expense)}
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
      <div className={classes.buttonContainer}>
        {currPage>1 && <Button 
          onClick={openPage.bind(null,currPage-1)}
          className={classes.button}>
            {currPage-1}
        </Button>}
        <Button 
          variant="success" 
          className={classes.button}>
            {currPage}
        </Button>
        {currPage < lastpage &&  <Button 
          onClick={openPage.bind(null,currPage+1)} 
          className={classes.button}>
            {currPage+1}
        </Button>}.................
        <Button
          onClick={openPage.bind(null,lastpage)} 
          className={classes.button}
        >
          {lastpage}
        </Button>
      </div>
    </div>
  );
};

export default ShowExpenses;
