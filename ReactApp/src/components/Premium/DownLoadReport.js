import React, { useContext } from 'react';
import classes from "./DownloadedExpense.module.css";
import ExpenseContext from '../../store/ExpenseContext';

const DownLoadReport = () => {
	const { downloadList } = useContext(ExpenseContext);
	// console.log(downloadList,"download list")
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