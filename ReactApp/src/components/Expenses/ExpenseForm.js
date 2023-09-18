import { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import ExpenseContext from "../../store/ExpenseContext";

const ExpenseForm = () => {
  const expenseCtx = useContext(ExpenseContext);
  const {editExpense, updateExpenseHandler} = expenseCtx;
  const [showExpenseForm,setShowExpenseForm] = useState(false);

  const showExpenseFormHanlder = () =>{
    setShowExpenseForm(!showExpenseForm);
  }

  const expenseRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    if(editExpense) {
      // console.log(expenseRef.current,"ref")
      expenseRef.current.value = editExpense.expense;
      categoryRef.current.value = editExpense.category;
      priceRef.current.value = editExpense.price;
    }
  },[editExpense])

  const submitHandler = (event) => {
    event.preventDefault();
    const expense = expenseRef.current.value;
    const category = categoryRef.current.value;
    const price = +priceRef.current.value;

    const newExpense = { expense, category, price };

    if (editExpense) {
      updateExpenseHandler({
        ...newExpense,
        id: editExpense.id, 
        prevExpensePrice: editExpense.price 
      });
      return;
    }
    // console.log(newExpense, "expense");
    expenseCtx.addExpense(newExpense);
    expenseRef.current.value = "";
    categoryRef.current.value = "";
    priceRef.current.value = "";
  };

  return (
    <>
    {!editExpense && !showExpenseForm &&
      <Button 
        variant="dark"
        className={classes.addExpense}
        onClick={showExpenseFormHanlder}
      >
        Add Expense Here!
      </Button>
    }
    {(editExpense || showExpenseForm) && <Container fluid className="bg-warning p-3">
        <Row>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Expense:</Form.Label>
                  <Form.Control 
                    placeholder="Expense Name" 
                    type="text" 
                    ref={expenseRef}>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Price:</Form.Label>
                  <Form.Control placeholder="Price" type="number" ref={priceRef}></Form.Control>
                </Form.Group>
              </Col>

              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Category:</Form.Label>
                  <Form.Select type="select" ref={categoryRef} required>
                    <option value="" hidden>Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Fuel">Fuel</option>
                    <option value="House Expense">House Expense</option>
                    <option value="Education Fee">Education Fee</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="col-2">
                <Button
                  className={classes.button}
                  variant="success"
                  type="submit"
                >
                  {editExpense ? "Update Expense" : "Add Expense"}
                </Button>{' '}

                {!editExpense && <Button 
                  // disabled={editingExpense}
                  variant="dark"
                  className={classes.button} 
                  onClick={showExpenseFormHanlder} 
                >
                  close
                </Button>}
              </Col>
            </Row>
          </Form>
      </Row>
    </Container>
  }
  </>
  );
};

export default ExpenseForm;
