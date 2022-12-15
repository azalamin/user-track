import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditForm from './components/EditForm';
import Home from './components/Home';
import UserForm from './components/UserForm';

function App() {
	const [userId, setUserId] = useState('');
	const handleUpdateUser = (id) => {
		setUserId(id)
	}
  return (
		<div>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home handleUpdateUser={handleUpdateUser} />} />
				<Route path='/edit' element={<EditForm userId={userId} />} />
				<Route path='/add-user' element={<UserForm />} />
			</Routes>
		</div>
	);
}

export default App;
