import { useEffect, useState } from 'react';

import { isVegan, isVegetarian } from '../../../utilities/checkProducts';
import trueIcon from '../../../assets/true.svg';
import falseIcon from '../../../assets/false.svg';
import maybeIcon from '../../../assets/maybe.svg';
import styles from './Result.module.scss';

const Result = props => {
	const [product, setProduct] = useState(null);
	const [vegan, setVegan] = useState(null);
	const [vegetarian, setVegetarian] = useState(null);

	let output = null;

	useEffect(() => {
		const fetchData = async barcode => {
			const response = await fetch(
				`https://world.openfoodfacts.org/api/v0/product/${props.barcode}`
			);
			const fetchedData = await response.json();

			console.log(fetchedData);

			setProduct(fetchedData.product);
			if (isVegan(fetchedData.product.ingredients) === 'yes') {
				setVegan('yes');
				setVegetarian('yes');
			} else {
				setVegan(isVegan(fetchedData.product.ingredients));
				setVegetarian(isVegetarian(fetchedData.product.ingredients));
			}
		};
		fetchData(props.barcode);
	}, [props.barcode]);

	console.log(`Vegan state is ${vegan}`);
	console.log(`Vegetarian state is ${vegetarian}`);

	if (product) {
		output = (
			<div className={styles.wrapper}>
				<div className={styles.resultContainer}>
					<div className={styles.imgContainer}>
						<img
							src={product.image_front_small_url}
							alt='text'
							height='100px'
						/>
					</div>
					<div className={styles.detailsContainer}>
						<h4>
							{product.product_name} "{product.brands}"
						</h4>
						<div>
							{vegan === 'yes' && (
								<img src={trueIcon} alt='Vegan' height='50px' />
							)}
							{vegan === 'no' && (
								<img src={falseIcon} alt='Not Vegan' height='50px' />
							)}
							{(vegan === 'maybe' || vegan === 'unknown') && (
								<img src={maybeIcon} alt='Maybe or unknown' height='50px' />
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	return <>{output}</>;
};

export default Result;
