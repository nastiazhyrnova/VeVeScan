export const isVegan = ingredients => {
	switch (true) {
		case !!ingredients.find(ingredient => ingredient.vegan === 'no'):
			return 'no';
		case !!ingredients.find(ingredient => ingredient.vegan === 'yes'):
			return 'yes';
		case !!ingredients.find(ingredient => ingredient.vegan === 'maybe'):
			return 'maybe';
		default:
			return 'unknown';
	}
};
export const isVegetarian = ingredients => {
	switch (true) {
		case !!ingredients.find(ingredient => ingredient.vegetarian === 'no'):
			return 'no';
		case !!ingredients.find(ingredient => ingredient.vegetarian === 'yes'):
			return 'yes';
		case !!ingredients.find(ingredient => ingredient.vegetarian === 'maybe'):
			return 'maybe';
		default:
			return 'unknown';
	}
};
