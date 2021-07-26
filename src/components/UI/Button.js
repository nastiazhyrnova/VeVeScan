const Button = props => {
	return (
		<button
			className={`btn ${props.className}`}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.children}
		</button>
	);
};

export default Button;
