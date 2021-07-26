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

	const resetMain = _ => {
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
						barcode={barcode}
						resetBarcode={resetMain}
						showDetails={showDetailsHandler}
					/>
					<Scanner
						onScan={setBarcode}
						scannerActive={scannerActive}
						deactivateScanner={_ => setScannerActive(false)}
					/>
				</>
			)}
			{showDetails && (
				<Details productDetails={productDetails} resetAll={resetMain} />
			)}
		</>
	);
};

export default Main;

//nata - 8480017095671
//maiz - 8480000167644
//piri piri - 8480000173966
//cookies - 3560070048939
