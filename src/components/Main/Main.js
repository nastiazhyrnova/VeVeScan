import { useState } from 'react';

import Scanner from '../Scanner/Scanner';
import Result from '../Scanner/Result/Result';

const Main = () => {
	const [barcode, setBarcode] = useState('');

	return (
		<div>
			<Result barcode={8480000202109} />
			<Scanner onScan={setBarcode} />
		</div>
	);
};

export default Main;
