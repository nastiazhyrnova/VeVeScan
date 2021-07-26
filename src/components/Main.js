import { useState } from 'react';

import Scanner from './Scanner';
import Result from './Result';
import Details from './Details';

const Main = () => {
	const [barcode, setBarcode] = useState(null);
	const [scannerActive, setScannerActive] = useState(true);
	const [showDetails, setShowDetails] = useState(false);
	const [productDetails, setProductDetails] = useState({
		product: null,
		ingredients: null,
	});

	console.log(barcode);

	const resetAll = _ => {
		setBarcode(null);
		setScannerActive(true);
		setShowDetails(false);
		setProductDetails({
			product: null,
			ingredients: null,
		});
	};

	const showDetailsHandler = (product, ingredientsFormatted) => {
		setShowDetails(true);
		setProductDetails({
			product: product,
			ingredients: ingredientsFormatted,
		});
	};

	return (
		<>
			{!showDetails && (
				<>
					<Result
						barcode={8480017095671}
						resetBarcode={resetAll}
						showDetails={showDetailsHandler}
					/>
					<Scanner
						onScan={setBarcode}
						scannerActive={scannerActive}
						deactivateScanner={_ => setScannerActive(false)}
					/>
				</>
			)}
			{showDetails && <Details productDetails={productDetails} />}
		</>
	);
};

export default Main;

//nata - 8480017095671
//maiz - 8480000167644
