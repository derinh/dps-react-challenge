import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

//data list
interface User {
	id: number;
	firstName: string;
	lastName: string;
	birthDate: string;
	address: {
		city: string;
	};
}

interface ApiResponse {
	users: User[];
}

const DataList: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [nameFilter, setNameFilter] = useState('');
	const [cityFilter, setCityFilter] = useState('');
	const [highlightOldest, setHighlightOldest] = useState(false);
	const [debouncedNameFilter, setDebouncedNameFilter] = useState('');

	//api fetch
	useEffect(() => {
		axios.get<ApiResponse>('https://dummyjson.com/users')
			.then(res => setUsers(res.data.users || []));

	}, []);


	//Timer for name filter
	useEffect(() => {
		const timer = setTimeout(() => setDebouncedNameFilter(nameFilter), 1000);
		return () => clearTimeout(timer);
	}, [nameFilter]);

	//city selection filter
	const cities = useMemo(() => {
		return Array.from(new Set(users.map(u => u.address.city)));
	}, [users]);

	const filteredUsers = useMemo(() => {
		return users.filter((user: User) => {
			const nameMatch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(debouncedNameFilter.toLowerCase());
			const cityMatch = cityFilter === '' || user.address.city === cityFilter;
			return nameMatch && cityMatch;
		});
	}, [users, debouncedNameFilter, cityFilter]);

	const oldestByCity = useMemo(() => {
		const map = new Map<string, User>();
		users.forEach(user => {
			const existing = map.get(user.address.city);
			if (!existing || new Date(user.birthDate) < new Date(existing.birthDate)) {
				map.set(user.address.city, user);
			}
		});
		return new Set([...map.values()].map(u => u.id));
	},[users]);


	return (
		<div style={{ padding: '1rem' }}>
			<div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
				<input
					placeholder="Name"
					value={nameFilter}
					onChange={e => setNameFilter(e.target.value)}
				/>
				<select value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
					<option value=''>Select city</option>
					{cities.map(city => (
						<option key={city} value={city}>{city}</option>
					))}
				</select>

				<label>
					<input
						type="checkbox"
						checked={highlightOldest}
						onChange={e => setHighlightOldest(e.target.checked)}
					/>
					Highlight oldest per city
				</label>
			</div>

			<table border={1} cellPadding={8}>
				<thead>
					<tr>
						<th>Name</th>
						<th>City</th>
						<th>Birthday</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map(user => {
						const isHighlighted = highlightOldest && oldestByCity.has(user.id);
						return (
							<tr key={user.id} style={{ backgroundColor: isHighlighted ? '#add8e6' : undefined}}>
								<td>{user.firstName} {user.lastName}</td>
								<td>{user.address.city}</td>
								<td>{new Date(user.birthDate).toLocaleDateString()}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default DataList;