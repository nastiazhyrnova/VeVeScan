import { useEffect, useState } from 'react';
import Quagga from 'quagga';

import frame from '../../assets/frame.svg';
import whiteLogo from '../../assets/logo-white.svg';

const Scanner = props => {
	const getBarcode = result => {
		Quagga.offDetected(getBarcode);
		props.deactivateScanner();
		props.onScan(result.codeResult.code);
	};

	const { scannerActive } = props;

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

				Quagga.onDetected(getBarcode)
			);
		}
	}, [scannerActive]);

	return (
		<>
			<div className='scanner__marker-container'>
				<img
					src={whiteLogo}
					alt='Logo'
					className='scanner__marker-container__white-logo'
				/>
				<div className='scanner__marker-container__frame-container'>
					<img
						src={frame}
						alt='Frame to scan the barcode'
						className='scanner__marker-container__frame-container__frame'
					/>
					<div></div>
					<p>Escanea el código de barras</p>
				</div>
			</div>

			<div className='scanner__video'>
				<video />
			</div>
		</>
	);
};

export default Scanner;
