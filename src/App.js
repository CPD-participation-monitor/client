import { NavBar, Register, Login, LandingPage, AboutUs, AdminDashboard, OrgDashboard, UserDashboard, CPDDashboard } from './components';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<main className="App">
			<NavBar />
			<Routes>
				{/* public routes */}
				<Route path='/' element={<LandingPage />}></Route>
				<Route path='/register' element={<Register type={'user'} />}></Route>
				<Route path='/register-org' element={<Register type={'org'} />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/about' element={<AboutUs />}></Route>
				<Route path='/findcpd' element={<CPDDashboard />}></Route>

				{/* protected routes */}
				<Route element={<RequireAuth />}>
					<Route path='/admindash' element={<AdminDashboard />}></Route>
					<Route path='/orgdash' element={<OrgDashboard />}></Route>
					<Route path='/userdash' element={<UserDashboard />}></Route>
				</Route>
			</Routes>
		</main>
	);
}

export default App;
