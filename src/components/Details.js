import { useState } from 'react';

import Card from './UI/Card';
import Header from './UI/Header';
import Button from './UI/Button';
import Ingredients from './Ingredients/Ingredients';

const Details = props => {
	const [chosenDiet, setChosenDiet] = useState('vegan');

	console.log(props.productDetails);
	console.log(props.productDetails.product.name);

	const toggleDiet = _ => {
		if (chosenDiet === 'vegan') {
			setChosenDiet('vegetarian');
		} else {
			setChosenDiet('vegan');
		}
	};

	let ingredients = '';
	if (props.productDetails.ingredients) {
		ingredients = (
			<Ingredients
				ingredients={props.productDetails.ingredients}
				diet={chosenDiet}
				dietTitle={chosenDiet === 'vegan' ? 'Vegano' : 'Vegetariano'}
				withLeavesIcon
			/>
		);
	}

	return (
		<div className='wrapper'>
			<div className='details'>
				<Card className='details__title-card'>
					<Header className='details__title-card__header'>
						<h3>{props.productDetails.product.product_name}</h3>
						<h3>
							{props.productDetails.product.brands &&
								`(${props.productDetails.product.brands})`}
						</h3>
					</Header>
				</Card>
				<Card className='details__ingredients-card'>
					<Header>
						<p>Ingredientes</p>
					</Header>
					<div className='details__ingredients-card__info'>
						<p>Elige tu dieta</p>
						<div className='details__ingredients-card__info__buttons'>
							<Button
								disabled={chosenDiet === 'vegan'}
								className={chosenDiet === 'vegetarian' && 'inactive'}
								onClick={toggleDiet}>
								Vegana
							</Button>
							<Button
								disabled={chosenDiet === 'vegetarian'}
								className={chosenDiet === 'vegan' && 'inactive'}
								onClick={toggleDiet}>
								Vegetariana
							</Button>
						</div>
						{ingredients}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Details;
