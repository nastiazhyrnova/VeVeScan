import rightIcon from '../assets/icons/right.svg';
import wrongIcon from '../assets/icons/wrong.svg';
import warningIcon from '../assets/icons/warnning.svg';
import unknownIcon from '../assets/icons/unknown.svg';

const findIngredientsByStatus = (ingredients, diet, status) =>
	ingredients.find(ingredient => ingredient[diet] === status);

export const formatIngredientName = name => {
	const noLowerDashName = name.replace(/_/g, '');
	return noLowerDashName.charAt(0).toUpperCase() + noLowerDashName.slice(1);
};

export const getIngredientsStatus = ingredients =>
	ingredients.map(ingredient => {
		const newIngredient = {
			name: formatIngredientName(ingredient.text),
			vegan: 'unknown',
			vegetarian: 'unknown',
		};
		//vegan
		if (ingredient.vegan) {
			newIngredient.vegan = ingredient.vegan;
		}

		//vegetarian
		if (ingredient.vegetarian) {
			newIngredient.vegetarian = ingredient.vegetarian;
		}

		return newIngredient;
	});

export const checkDietStatus = (ingredients, diet) => {
	switch (true) {
		case !!findIngredientsByStatus(ingredients, diet, 'no'):
			return 'no';
		case !!findIngredientsByStatus(ingredients, diet, undefined):
			return 'unknown';
		case !!findIngredientsByStatus(ingredients, diet, 'unknown'):
			return 'unknown';
		case !!findIngredientsByStatus(ingredients, diet, 'maybe'):
			return 'maybe';
		case !!findIngredientsByStatus(ingredients, diet, 'yes'):
			return 'yes';
		default:
			return 'unknown';
	}
};

export const getNonDietIngredients = (ingredients, diet) => {
	return ingredients.filter(ingredient => {
		if (!ingredient[diet]) {
			return true;
		} else if (ingredient[diet] !== 'yes') {
			return true;
		} else {
			return false;
		}
	});
};

export const getIcon = (dietState, dietName) => (
	<>
		{dietState === 'yes' && (
			<img src={rightIcon} alt={dietName} title={dietName} />
		)}
		{dietState === 'no' && (
			<img src={wrongIcon} alt={`No ${dietName}`} title={`No ${dietName}`} />
		)}
		{dietState === 'maybe' && (
			<img
				src={warningIcon}
				alt={`Quizás ${dietName}`}
				title={`Quizás ${dietName}`}
			/>
		)}
		{dietState === 'unknown' && (
			<img
				src={unknownIcon}
				alt={`${dietName}: estado desconocido`}
				title={`${dietName}: estado desconocido`}
			/>
		)}
	</>
);

export const sortIngredients = (ingredients, diet) => {
	const sortOrder = ['no', 'maybe', 'unknown'];
	const initialIngredients = Object.assign(ingredients);
	return initialIngredients.sort(
		(a, b) => sortOrder.indexOf(a[diet]) - sortOrder.indexOf(b[diet])
	);
};
