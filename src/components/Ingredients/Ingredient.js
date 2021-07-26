const Ingredient = props => {
	return (
		<li className={props.className && props.className}>{props.children}</li>
	);
};

export default Ingredient;
