import { useState } from 'react';

import Scanner from '../Scanner/Scanner';
import Result from '../Scanner/Result/Result';

const Main = () => {
	const [barcode, setBarcode] = useState('');

	return (
		<>
			{/* <Result barcode={8480000202109} /> */}
			<Scanner onScan={setBarcode} />
		</>
	);
};

export default Main;
