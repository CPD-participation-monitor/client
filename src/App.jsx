import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import { HOME_ROUTE, ENG_DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE, CPD_DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, ORG_DASHBOARD_ROUTE, EVENT_DASHBOARD_ROUTE } from './utils/routes';
import { roles } from './utils/constants';
import RequireAuth from './features/auth/RequireAuth';
import Layout from './components/Layout';
import Home from './pages/Home';
import EngDashboard from './pages/EngDashboard';
import OrgAdminDashboard from './pages/OrgAdminDashboard';
import OrgDashboard from './pages/OrgDashboard';
import CPDDashboard from './pages/CPDDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Layout />} >
            {/* public routes */}
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={LOGIN_ROUTE} element={<Login />} />
            <Route path={REGISTER_ROUTE} element={<Register />} />
            <Route path={CPD_DASHBOARD_ROUTE} element={<CPDDashboard />} />
            <Route path={ORG_DASHBOARD_ROUTE} element={<OrgDashboard />} />

            {/* protected routes */}
            <Route element={<RequireAuth allowedRoles={[roles.ENG]} />}>
              <Route path={ENG_DASHBOARD_ROUTE} element={<EngDashboard />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[roles.ORG_ADMIN, roles.ORG_SUPER_ADMIN]} />}>
              <Route path={ADMIN_DASHBOARD_ROUTE} element={<OrgAdminDashboard />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  )
}

export default App
