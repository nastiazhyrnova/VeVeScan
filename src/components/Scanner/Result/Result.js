import { useEffect, useState } from 'react';

import { isVegan, isVegetarian } from '../../../utilities/checkProducts';
import rightIcon from '../../../assets/icons/right.svg';
import wrongIcon from '../../../assets/icons/wrong.svg';
import warningIcon from '../../../assets/icons/warnning.svg';
import unknownIcon from '../../../assets/icons/unknown.svg';

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
			<div className='result'>
				<div className=''>
					<img src={product.image_front_small_url} alt='text' />
				</div>
				<div className='detailsContainer'>
					<h4>
						{product.product_name} "{product.brands}"
					</h4>
					<div className='iconsContainer'>
						{vegan === 'yes' && <img src={rightIcon} alt='Vegan' />}
						{vegan === 'no' && <img src={wrongIcon} alt='Not Vegan' />}
						{vegan === 'maybe' && <img src={warningIcon} alt='Maybe vegan' />}
						{vegan === 'unknown' && (
							<img src={unknownIcon} alt='Vegan status unknown' />
						)}
					</div>
				</div>
			</div>
		);
	}

	return <>{output}</>;
};

export default Result;
