import PropTypes from 'prop-types';

import Ingredient from './Ingredient';

import { sortNonDietaryIngredients, getIcon } from '../../utilities/results';

const Ingredients = props => {
	let output = '';

	//if props are passed:
	if (props.ingredients) {
		let ingredients;

		if (props.onlyNonDietary) {
			//if we need only non dietary ingredients:
			const filteredIngredients = props.ingredients.filter(
				ingredient => ingredient[props.diet] !== 'yes'
			);
			ingredients = sortNonDietaryIngredients(filteredIngredients, props.diet);
		} else {
			ingredients = props.ingredients;
		}

		output = ingredients.map((ingredient, index) => (
			<Ingredient
				key={`${index}${ingredient.name}`}
				className={`${ingredient[props.diet]}`}>
				{getIcon(ingredient[props.diet], props.dietTitle, props.withLeavesIcon)}{' '}
				{ingredient.name}
			</Ingredient>
		));
	} else {
		output = <></>;
	}

	return <ul className={props.ulClassName && props.ulClassName}>{output}</ul>;
};

Ingredients.propTypes = {
	diet: PropTypes.string.isRequired,
	dietTitle: PropTypes.string.isRequired,
	ingredients: PropTypes.array.isRequired,
	onlyNonDietary: PropTypes.bool,
	withLeavesIcon: PropTypes.bool,
};

export default Ingredients;
