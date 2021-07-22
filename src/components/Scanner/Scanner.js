import { useEffect } from 'react';
import Quagga from 'quagga';

import frame from '../../assets/frame.svg';
import whiteLogo from '../../assets/logo-white.svg';

const Scanner = props => {
	const onDetected = result => {
		Quagga.offDetected(onDetected);

		const barcode = result.codeResult.code;

		// validation if necessary
		// try to fetch data
		//  if not
		// alert('Could not read the barcode, please try again')
		props.onScan(barcode);
		// alert(barcode);
	};

	useEffect(() => {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			Quagga.init(
				{
					inputStream: {
						name: 'Live',
						type: 'LiveStream',
						target: document.querySelector('.scanner__video'),
						constraints: {
							facingMode: 'environment',
						},
					},
					numOfWorkers: 1,
					locate: true,
					decoder: {
						readers: ['ean_reader'],
					},
				},
				err => {
					if (err) {
						console.log(err);
						alert('Cannot open the camera, please allow its use');
						return;
					}
					Quagga.start();
				},

				Quagga.onDetected(onDetected)
			);
		}
	}, []);

	return (
		<>
			<div className='scanner__marker-container'>
				<img
					src={frame}
					alt='Frame to scan the barcode'
					className='scanner__marker-container__frame'
				/>
				<div></div>
				<p>Escanea el código de barras</p>
			</div>
			<img
				src={whiteLogo}
				alt='Logo'
				className='scanner__marker-container__white-logo'
			/>
			<div className='scanner__video'>
				<video />
			</div>
		</>
	);
};

export default Scanner;
