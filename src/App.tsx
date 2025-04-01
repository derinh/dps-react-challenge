import dpsLogo from './assets/DPS.svg';
import './App.css';
//import react from 'react';
import DataList from './DataList.tsx';

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<p>Your solution goes here 😊
					<DataList></DataList>
				</p>
			</div>
		</>
	);
}

export default App;
