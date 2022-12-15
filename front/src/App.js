import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserForm from './components/UserForm';

function App() {
  return (
		<div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/edit' element={<UserForm />} />
				<Route path='/add-user' element={<UserForm />} />
			</Routes>
		</div>
	);
}

export default App;
