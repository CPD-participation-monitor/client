import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import { HOME_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './utils/routes';
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
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route path={REGISTER_ROUTE} element={<Register />} />
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
