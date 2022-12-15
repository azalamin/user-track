import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditForm from './components/EditForm';
import Home from './components/Home';
import UserForm from './components/UserForm';

function App() {
	
  return (
		<div>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home  />} />
				<Route path='/edit' element={<EditForm  />} />
				<Route path='/add-user' element={<UserForm />} />
			</Routes>
		</div>
	);
}

export default App;
