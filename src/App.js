import { Layout, NavBar, Register, Login, LandingPage, AboutUs, OrgAdminDashboard, OrgDashboard, UserDashboard, CPDDashboard, NotFound, Unauthorized } from './components';
import RequireAuth from './javascript/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {

	const ROLES = {
		eng: 2044,
		orgAdmin: 6445,
		orgSuperAdmin: 3112,
		admin: 1344
	};

	return (
		<main className="App">
			<NavBar />
			<Routes>
				<Route path='/' element={<Layout />}>
					{/* public routes */}	
					<Route path='' element={<LandingPage />}></Route>
					<Route path='register' element={<Register />}></Route>
					<Route path='login' element={<Login />}></Route>
					<Route path='about' element={<AboutUs />}></Route>
					<Route path='findcpd' element={<CPDDashboard />}></Route>
					<Route path='unauthorized' element={<Unauthorized />}></Route>

					{/* protected routes */}
					<Route element={<RequireAuth allowedRoles={[ROLES.eng]} />}>
						<Route path='userdash' element={<UserDashboard />}></Route>
					</Route>
					<Route element={<RequireAuth allowedRoles={[ROLES.orgSuperAdmin, ROLES.orgAdmin]} />}>
						<Route path='orgadmindash' element={<OrgAdminDashboard />}></Route>
						<Route path='orgdash' element={<OrgDashboard />}></Route>
					</Route>

					{/* catch all route */}
					<Route path='*' element={<NotFound />}></Route>
				</Route>
			</Routes>
		</main>
	);
}

export default App;
