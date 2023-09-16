import React, { useContext, useEffect, useState } from 'react'
import classes from "./Leaderboard.module.css";
import ExpenseContext from '../../store/ExpenseContext';

const Leaderboard = () => {
	const [leaderboardData,setLeaderboardData] = useState([]);
	console.log("leader")
	const {expenses} = useContext(ExpenseContext)
	useEffect(() => {
		const fetchData = async() => {
			try {
				const userName = localStorage.getItem("userName");
				const token = localStorage.getItem("token");
				if(!userName || !token) {
					return;
				}
				// console.log("useeffect")
				const response = await fetch("http://localhost:4000/premium/showLeaderboard", {
					headers: {
						"Content-Type": "application/json",
						"Authorization": token
					},
				});
				// console.log("res in leaderboard", response)
				const data = await response.json();
				console.log(data,"leaderboard");
				setLeaderboardData(data);
			} catch (error) {
				console.log(error,"leaderboard")
			}
		};
		fetchData();
	},[expenses])
  return (
    <div className={classes.box}>
			<h2 className={classes.heading} >Leaderboard</h2>
			{leaderboardData.map(data => 
				<div key={data.id} className={classes.row}>
					<h6>{data.name}</h6>
					<h6>{data.totalSpent}</h6>
				</div>
			)}
		</div>
  )
}

export default Leaderboard