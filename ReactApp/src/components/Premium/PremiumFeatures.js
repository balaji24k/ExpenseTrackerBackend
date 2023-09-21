import { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import ExpenseContext from "../../store/ExpenseContext";

const PremiumFeatures = (props) => {
  const expenseCtx = useContext(ExpenseContext);
	const [isLoading,setIsLoading] = useState(false);
	const downloadExpense = async() => {
    try {
			setIsLoading(true);
			const token = localStorage.getItem('token')
			const response = await fetch(`${process.env.REACT_APP_BACKEND_API}/premium/download`, { 
					headers: {"Authorization" : token} 
			});
			if(!response.ok) {
				alert("something went wrong!");
				setIsLoading(false);
				return;
			}
			const data = await response.json();
			window.location = data.fileUrl;
			setIsLoading(false);
      expenseCtx.addDownloadedFile(data);
    } catch(error) {
        console.error("Download error:", error);
    }
	};

  return (
    <>
      <Button onClick={props.showLeaderboardHandler}>
        {props.isShowLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
      </Button>{" "}
      {props.isDarkMode ? 
				<Button onClick={props.removeDarkMode}>Light Mode</Button>
      		: 
				<Button onClick={props.darkMode}>Dark Mode</Button>
      }{" "}
      {/* <Button onClick={downloadExpense}>Download</Button> */}
			<Button onClick={downloadExpense}>
        {isLoading ?   
          <span>
            Downloading
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
          </span>
          : 
          'Download'
        }
      </Button>
    </>
  );
};

export default PremiumFeatures;
