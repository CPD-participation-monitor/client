import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import { HOME_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './utils/routes';
import { roles } from './utils/constants';
import RequireAuth from './features/auth/RequireAuth';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="" element={<Layout />} >
            <Route path={HOME_ROUTE} element={<Home />} />
            <Route path={LOGIN_ROUTE} element={<Login />} />
            <Route path={REGISTER_ROUTE} element={<Register />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[roles.eng]} />}>
            <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          </Route>
        </Routes>
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
