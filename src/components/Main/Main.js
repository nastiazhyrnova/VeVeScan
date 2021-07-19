import { useState } from 'react';

import Scanner from '../Scanner/Scanner';
import Result from '../Scanner/Result/Result';

const Main = () => {
	const [barcode, setBarcode] = useState('');

	return (
		<div>
			{/* <Scanner onScan={setBarcode} /> */}
			<Result barcode={8480000202109} />
		</div>
	);
};

export default Main;
