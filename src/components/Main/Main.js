import { useState } from 'react';

import Scanner from '../Scanner/Scanner';
import Result from '../Result/Result';

const Main = () => {
	const [barcode, setBarcode] = useState(null);
	const [scannerActive, setScannerActive] = useState(true);

	console.log(barcode);

	const resetAll = _ => {
		setBarcode(null);
		setScannerActive(true);
	};

	return (
		<>
			<Result barcode={barcode} resetBarcode={resetAll} />
			<Scanner
				onScan={setBarcode}
				scannerActive={scannerActive}
				deactivateScanner={_ => setScannerActive(false)}
			/>
		</>
	);
};

export default Main;
