import React, { useState } from 'react';

function FirstComponent() {
	const [query, setQuery] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const handleSearch = () => {
		console.log("Searching for:", query);
	};

	return(
		<div>
			<input
				type="text"
				value={query}
				onChange={handleChange}
				placeholder="Search..."
			/>
			<button onClick={handleSearch}>Search</button>
		</div>
	);
}

export default FirstComponent;