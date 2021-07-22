import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import Header from '../UI/Header';
import Button from '../UI/Button';

import { isVegan, isVegetarian } from '../../utilities/checkProducts';
import rightIcon from '../../assets/icons/right.svg';
import wrongIcon from '../../assets/icons/wrong.svg';
import warningIcon from '../../assets/icons/warnning.svg';
import unknownIcon from '../../assets/icons/unknown.svg';

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

	const getIcon = (dietState, dietName) => (
		<>
			{dietState === 'yes' && <img src={rightIcon} alt={dietName} />}
			{dietState === 'no' && <img src={wrongIcon} alt={`No ${dietName}`} />}
			{dietState === 'maybe' && (
				<img src={warningIcon} alt={`Quizás ${dietName}`} />
			)}
			{dietState === 'unknown' && (
				<img src={unknownIcon} alt={`${dietName}: estado desconocido`} />
			)}
		</>
	);

	let newOut = '';
	if (product) {
		newOut = (
			<div className='result'>
				<Card className='result__card'>
					<Header>
						<h3>{product.product_name}</h3>
						<p>{product.brands}</p>
					</Header>
					<div className='result__info'>
						<div className='result__info__check'>
							<div className='result__info__check__item'>
								{getIcon(vegan, 'Vegano')}
								<p className={`${vegan}`}>Vegano</p>
							</div>
							<div className='result__info__check__item'>
								{getIcon(vegetarian, 'Vegatariano')}
								<p className={`${vegetarian}`}>Vegetariano</p>
							</div>
						</div>
						<div className='result__info__ingredients'>
							<ul>
								<li>Ingredient</li>
								<li>Ingredient</li>
							</ul>
							<ul>
								<li>Ingredient</li>
								<li>Ingredient</li>
							</ul>
						</div>
						<Button className='result__info__btn' onClick={_ => {}}>
							<p>Ingredientes →</p>
						</Button>
					</div>
				</Card>
			</div>
		);
	}

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

	return <>{newOut}</>;
};

export default Result;
