import { Layout, NavBar, Register, Login, Logout, LandingPage, AboutUs, OrgAdminDashboard, OrgDashboard, UserDashboard, CPDDashboard, NotFound, Unauthorized } from './components';
import RequireAuth from './javascript/RequireAuth';
import { Routes, Route } from 'react-router-dom';

import ROLES from './constants/roles';

function App() {

	return (
		<main className="App">
			<NavBar />
			<Logout /> 
			<Routes>
				<Route exact path='/' element={<Layout />}>
					{/* public routes */}	
					<Route exact path='' element={<LandingPage />}></Route>
					<Route path='register' element={<Register />}></Route>
					<Route path='login' element={<Login />}></Route>
					<Route path='about' element={<AboutUs />}></Route>
					<Route path='cpddash/:type' element={<CPDDashboard />}></Route>
					<Route path='orgdash' element={<OrgDashboard />}></Route>
					{/* <Route path='unauthorized' element={<Unauthorized />}></Route> */}

					{/* protected routes */}
					<Route element={<RequireAuth allowedRoles={[ROLES.eng]} />}>
						<Route path='engdash' element={<UserDashboard />}></Route>
						<Route path='engdash/orgdash/:orgId' element={<OrgDashboard />}></Route>
					</Route>
					<Route element={<RequireAuth allowedRoles={[ROLES.orgSuperAdmin, ROLES.orgAdmin]} />}>
						<Route path='orgadmindash' element={<OrgAdminDashboard />}></Route>
						<Route path='orgadmindash/orgdash/:orgId' element={<OrgDashboard />}></Route>
					</Route>

					{/* catch all route */}
					<Route path='*' element={<NotFound />}></Route>
				</Route>
			</Routes>
		</main>
	);
}

export default App;
