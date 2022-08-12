import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="conatiner App-header">
			<h2 className="App-name" data-cy="header-title">
				<Link to="/" className="App-name">
					To Do List App
				</Link>
			</h2>
		</header>
	);
};

export default Header;
