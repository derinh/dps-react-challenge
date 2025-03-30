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

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
					gap: '16px',
					marginTop: '20px'
				}}
			>
				{data.map((item) => (
					<div
						key={item.id}
						style={{
							border: '1px solid #ccc',
							padding: '8px',
							borderRadius: '4px'
						}}
					>
						{item.name}
					</div>
				))}
			</div>
		</div>
	);
};

export default DataList;