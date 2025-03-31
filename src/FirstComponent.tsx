import React, { useEffect, useState } from 'react';

//data list
type DataItem = {
	id: number;
	name: string;
	//city: string;
	//birthday: number;
};

const DataList: React.FC = () => {
	const [query, setQuery] = useState<string>('');
	const [data, setData] = useState<DataItem[]>([]);

	useEffect(() => {
		const fetchedData: DataItem[] = [
			{ id: 1, name: 'Item One' },
			{ id: 2, name: 'Item Two' },
			{ id: 3, name: 'Item Three' },
			{ id: 4, name: 'Item Four' }
		];
		setData(fetchedData);
	}, []);


	return (
		<div>
			<input
				type="text"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}

			/>

			<table border={1} cellPadding={8}>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{}
				</tbody>
			</table>

		</div>
	);
};

export default DataList;