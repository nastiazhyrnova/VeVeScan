import styles from './Result.module.scss';

const Result = props => {
	console.log(props.barcode);

	return (
		<div className={styles.resultContainer}>
			<h4>Title</h4>
			<div className={styles.detailsContainer}>
				<div className={styles.imgContainer}>
					{/* <img src='' alt='text' /> */}
				</div>
			</div>
		</div>
	);
};

export default Result;
