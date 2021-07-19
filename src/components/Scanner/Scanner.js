import { useEffect } from 'react';
import Quagga from 'quagga';

import frame from '../../assets/frame.svg';
import whiteLogo from '../../assets/logo-white.svg';
import styles from './Scanner.module.scss';

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
						target: document.querySelector('#video'),
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
			<div className={styles.scannerContainer}>
				<div className={styles.markerContainer}>
					<img
						src={frame}
						alt='Frame to scan the barcode'
						className={styles.frame}
					/>
					<div></div>
					<p>Escanea el código de barras</p>
				</div>
				<img src={whiteLogo} alt='Logo' className={styles.whiteLogo} />
			</div>
			<div id='video'>
				<video />
			</div>
		</>
	);
};

export default Scanner;
