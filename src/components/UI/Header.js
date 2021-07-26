const Header = props => {
	return (
		<div className={`header-container ${props.className}`}>
			{props.children}
		</div>
	);
};

export default Header;
