import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer, Slide } from "react-toastify";
import { HOME_ROUTE } from './utils/routes';
import Home from './components/Home';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
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
