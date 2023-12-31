import { Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoginPage from "./components/Authentication/LoginPage";
import SignUpPage from "./components/Authentication/SignupPage";
import { useContext, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import classes from "./App.module.css";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ShowExpenses from "./components/Expenses/ShowExpenses";
import AuthContext from "./store/AuthContext";
import Leaderboard from "./components/Premium/Leaderboard";
import DownLoadReport from "./components/Premium/DownLoadReport";
import ForgotPassword from "./components/Authentication/ForgotPassword";

const App = () => {
  const {isLoggedIn} = useContext(AuthContext);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const darkModeHandler = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
  }

  const [isShowLeaderboard, setIsShowLeaderboard] = useState(false);
  const showLeaderboardHandler = () => {
    setIsShowLeaderboard(!isShowLeaderboard);
  }

  useEffect(()=>{
    if (localStorage.getItem("darkMode")) {
      setIsDarkMode(true)
    }
  },[])

  return (
    <div className={isDarkMode ? classes.darkMode : ""}>
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn && <Redirect to="/login"/>}
          {isLoggedIn && <Redirect to="/expenses"/>}
        </Route>
        <Route path="/forgotPassword" exact>
          <ForgotPassword/>
        </Route>
        <Route path="/login" exact>
          {!isLoggedIn && <LoginPage/>}
          {isLoggedIn && <Redirect to="/expenses"/>}
        </Route>
        <Route path="/signup" exact>
          {!isLoggedIn && <SignUpPage/>}
          {isLoggedIn && <Redirect to="/expenses"/>}
        </Route>
        <Route path="/expenses" exact>
          {!isLoggedIn && <Redirect to="/login"/>}
          {isLoggedIn && <>
            <Header
              isShowLeaderboard={isShowLeaderboard}
              showLeaderboardHandler={showLeaderboardHandler}
              isDarkMode={isDarkMode} 
              darkModeHandler={darkModeHandler} />
            <ExpenseForm/>
            <ShowExpenses/>
            <DownLoadReport/>
            {isShowLeaderboard && <Leaderboard/>}
          </>
          }
        </Route>
        <Route path="*" exact>
          {!isLoggedIn && <Redirect to="/login"/>}
          {isLoggedIn && <Redirect to="/expenses"/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
