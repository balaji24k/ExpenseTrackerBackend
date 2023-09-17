import React, { useContext, useEffect } from 'react';
import classes from "./DownloadedExpense.module.css";
import ExpenseContext from '../../store/ExpenseContext';

const DownLoadReport = () => {
	const { downloadList, replaceDownloadList } = useContext(ExpenseContext);
	// console.log(downloadList,"download list");
	useEffect(() => {
		const fetchData = async() => {
			try {
				const userName = localStorage.getItem("userName");
				const token = localStorage.getItem("token");
				if(!userName || !token) {
					return;
				}
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
				replaceDownloadList(updatedFileData);
			} catch (error) {
				console.log(error);
			}
		}
	fetchData()
	},[replaceDownloadList]);
  return (
		<>
			{downloadList.length>0 && <div className={classes.box} >
				<h4 className={classes.heading} >Downloaded List</h4>
				{downloadList.map(file => <div key={file.id} className={classes.row} >
					<h6>{file.dateString} - {file.timeString}</h6> -
					<a href={file.fileUrl} >DownLoad</a>
				</div>)}
			</div>}
		</>
  )
}

export default DownLoadReport