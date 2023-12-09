import { Layout, NavBar, Register, Login, Logout, LandingPage, AboutUs, OrgAdminDashboard, OrgDashboard, UserDashboard, CPDDashboard, NotFound, Unauthorized, EventDashboard, IssueCertificate } from './components';
import RequireAuth from './javascript/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { SharedStateProvider } from './context/SharedStateProvider';
import ROLES from './constants/roles';

function App() {

	return (
		<main className="App">
			<NavBar />
			<Logout /> 
			<SharedStateProvider>
				<Routes>
					<Route path='/' element={<Layout />}>
						{/* public routes */}	
						<Route exact path='' element={<LandingPage />}></Route>
						<Route path='register' element={<Register />}></Route>
						<Route path='login' element={<Login />}></Route>
						<Route path='about' element={<AboutUs />}></Route>
						<Route path='cpddash/' element={<Outlet />}>
							{/* This is the default content to be shown */}
							<Route index element={<CPDDashboard />}></Route>
							<Route path='orgdash/:orgId' element={<OrgDashboard />}></Route>
						</Route>

						{/* protected routes */}
						<Route element={<RequireAuth allowedRoles={[ROLES.eng]} />}>
							<Route path='engdash' element={<Outlet />}>
								<Route index element={<UserDashboard />}></Route>
								<Route path='orgdash/:orgId' element={<OrgDashboard />}></Route>
							</Route>
						</Route>
						<Route element={<RequireAuth allowedRoles={[ROLES.orgSuperAdmin]} />}>
							<Route path='orgsuperadmindash' element={<Outlet />}>
								<Route index element={<OrgAdminDashboard />}></Route>
								<Route path='orgdash/:orgId' element={<OrgDashboard />}></Route>
								<Route path='eventdash/:eventId' element={<EventDashboard />}></Route>
								<Route path='issuecert/:reqId' element={<IssueCertificate />}></Route>
							</Route>
						</Route>
						<Route element={<RequireAuth allowedRoles={[ROLES.orgSuperAdmin, ROLES.orgAdmin]} />}>
							<Route path='orgadmindash' element={<Outlet />}>
								<Route index element={<OrgAdminDashboard />}></Route>
								<Route path='orgdash/:orgId' element={<OrgDashboard />}></Route>
								<Route path='eventdash/:eventId' element={<EventDashboard />}></Route>
								<Route path='issuecert/:reqId' element={<IssueCertificate />}></Route>
							</Route>
						</Route>

						{/* catch all routes */}
						<Route path='*' element={<NotFound />}></Route>
					</Route>
				</Routes>
			</SharedStateProvider>
		</main>
	);
}

export default App;
