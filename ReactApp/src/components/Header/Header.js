import { useContext } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import AuthContext from "../../store/AuthContext";
import classes from "./Header.module.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PremiumFeatures from "../Premium/PremiumFeatures";
import PurchasePremium from "./PurchasePremium";

const Header = (props) => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const userName = authCtx.userName;

  const darkMode = () => {
    localStorage.setItem("darkMode",userName);
    props.darkModeHandler(true);
  }

  const removeDarkMode = () => {
    localStorage.removeItem("darkMode");
    props.darkModeHandler(false);
  }

  const logoutHandler = () => {
    authCtx.logout();
    removeDarkMode();
    history.replace("/");
  }

  return (
    <Container fluid>
      <Row className= "bg-success p-1">
        <Col className="col-4">
          <h3 className={classes.text} >User: {userName}</h3>
        </Col>
        <Col className="col-3">
          <h2 className={classes.text}>Expense Tracker</h2>
        </Col>
        <Col className="col-4">
          {authCtx.isPremiumUser && 
            <PremiumFeatures 
              showLeaderboardHandler={props.showLeaderboardHandler}
              removeDarkMode={removeDarkMode}
              darkMode={darkMode}
              isDarkMode={props.isDarkMode}
            />}
          {!authCtx.isPremiumUser && <PurchasePremium/>}
        </Col>
        <Col className="col-1">
          <Button
            variant="danger"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
