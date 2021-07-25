import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import Header from '../UI/Header';
import Button from '../UI/Button';

import {
	checkDietStatus,
	getIcon,
	getIngredientsStatus,
	sortIngredients,
} from '../../utilities/results';

const Result = props => {
	console.log(props.barcode);

	const [product, setProduct] = useState(null);
	const [allIngredients, setAllIngredients] = useState(null);
	const [vegan, setVegan] = useState(null);
	const [vegetarian, setVegetarian] = useState(null);
	const [error, setError] = useState(null);

	let output = null;

	useEffect(() => {
		if (props.barcode) {
			const fetchData = async barcode => {
				const response = await fetch(
					`https://world.openfoodfacts.org/api/v0/product/${props.barcode}`
				);
				const fetchedData = await response.json();
				console.log(fetchedData);

				if (fetchedData.status === 0) {
					setError(fetchedData.status_verbose);
				} else if (fetchedData.status === 1) {
					setError(null);
					setProduct(fetchedData.product);
					if (!fetchedData.product.ingredients) {
						//If no list of ingredients exists:
						setAllIngredients([
							{
								name: 'Sin ingredientes',
								vegan: 'unknown',
								vegetarian: 'unknown',
							},
						]);
					} else {
						console.log(typeof fetchedData.product.ingredients);
						setAllIngredients(
							getIngredientsStatus(fetchedData.product.ingredients)
						);
					}
				} else {
					setError('Unknown error');
				}
			};

			try {
				fetchData(props.barcode);
			} catch (err) {
				setError(err);
			}
		}
	}, [props.barcode]);

	useEffect(() => {
		if (allIngredients) {
			const isVegan = checkDietStatus(allIngredients, 'vegan');
			const isVegetarian = checkDietStatus(allIngredients, 'vegetarian');
			setVegan(isVegan);
			setVegetarian(isVegetarian);
		}
	}, [allIngredients]);

	const getIngredientsOutput = (ingredientsList, diet, dietTitle) => {
		if (allIngredients) {
			const allNonDietIngredients = ingredientsList.filter(
				ingredient => ingredient[diet] !== 'yes'
			);

			return sortIngredients(allNonDietIngredients, diet).map(
				(ingredient, index) => (
					<li key={`${index}${ingredient.name}`}>
						{getIcon(ingredient[diet], dietTitle)} {ingredient.name}
					</li>
				)
			);
		} else {
			return <></>;
		}
	};
	const nonVeganIngrOutput = getIngredientsOutput(
		allIngredients,
		'vegan',
		'Vegano'
	);
	const nonVegetarianIngrOutput = getIngredientsOutput(
		allIngredients,
		'vegetarian',
		'Vegetariano'
	);

	const tryAgain = _ => {
		//TODO  has to rerender Quaqq
		props.resetBarcode();
		setProduct(null);
		setVegan(null);
		setVegetarian(null);

		setError(null);
		setAllIngredients(null);
	};

	if (product) {
		output = (
			<div className='result'>
				<Card className='result__card'>
					<Header>
						<h3>{product.product_name}</h3>
						<p>({product.brands})</p>
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
							<ul>{nonVeganIngrOutput}</ul>
							<ul>{nonVegetarianIngrOutput}</ul>
						</div>
						<Button className='result__info__btn' onClick={_ => {}}>
							<p>Ingredientes →</p>
						</Button>
					</div>
				</Card>
			</div>
		);
	} else if (error) {
		output = (
			<div className='result'>
				<Card className='result__card'>
					<Header>
						<h3>Error</h3>
					</Header>
					<div className='result__info'>
						<h3 className='result__error'>{error}</h3>
						<Button className='result__error__btn' onClick={tryAgain}>
							Try again
						</Button>
					</div>
				</Card>
			</div>
		);
	}

	return <>{output}</>;
};

export default Result;
