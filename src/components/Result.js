import { useEffect, useState } from 'react';

import Card from './UI/Card';
import Header from './UI/Header';
import Button from './UI/Button';
import Ingredients from './Ingredients/Ingredients';

import {
	checkDietStatus,
	getIcon,
	getIngredientsStatus,
	sortNonDietaryIngredients,
} from '../utilities/results';

const Result = props => {
	const [product, setProduct] = useState(null);
	const [allIngredients, setAllIngredients] = useState(null);
	const [vegan, setVegan] = useState(null);
	const [vegetarian, setVegetarian] = useState(null);
	const [error, setError] = useState(null);

	let output = null;

	//load product info
	useEffect(() => {
		if (props.barcode) {
			const fetchData = async barcode => {
				const response = await fetch(
					`https://world.openfoodfacts.org/api/v0/product/${props.barcode}`
				);
				const fetchedData = await response.json();

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

	//check if Vegan and Vegetarian
	useEffect(() => {
		if (allIngredients) {
			const isVegan = checkDietStatus(allIngredients, 'vegan');
			const isVegetarian = checkDietStatus(allIngredients, 'vegetarian');
			setVegan(isVegan);
			setVegetarian(isVegetarian);
		}
	}, [allIngredients]);

	const resetAll = _ => {
		props.resetBarcode();
		setProduct(null);
		setVegan(null);
		setVegetarian(null);
		setError(null);
		setAllIngredients(null);
	};

	const openDetailsPage = _ => props.showDetails(product, allIngredients);

	if (product && allIngredients) {
		output = (
			<>
				<button
					className='result__close'
					onClick={resetAll}
					title='Cerrar producto'>
					<span className='result__close__cross--right'> </span>
					<span className='result__close__cross--left'></span>
				</button>
				<Card className='result__card'>
					<Header>
						<h3>{product.product_name}</h3>
						<p>{product.brands && `(${product.brands})`}</p>
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
							<Ingredients
								ingredients={allIngredients}
								diet='vegan'
								dietTitle='Vegano'
								onlyNonDietary
							/>
							<Ingredients
								ingredients={allIngredients}
								diet='vegetarian'
								dietTitle='Vegetariano'
								onlyNonDietary
							/>
						</div>
						<Button className='result__info__btn' onClick={openDetailsPage}>
							<p>Ingredientes →</p>
						</Button>
					</div>
				</Card>
			</>
		);
	} else if (error) {
		output = (
			<Card className='result__card'>
				<Header>
					<h3>Error</h3>
				</Header>
				<div className='result__info'>
					<h3 className='result__error'>{error}</h3>
					<Button className='result__error__btn' onClick={resetAll}>
						Try again
					</Button>
				</div>
			</Card>
		);
	}

	return <div className='result'>{output}</div>;
};

export default Result;
