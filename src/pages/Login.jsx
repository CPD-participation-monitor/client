import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../utils/toasts';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { ENG_DASHBOARD_ROUTE, ADMIN_DASHBOARD_ROUTE, REGISTER_ROUTE, HOME_ROUTE } from "../utils/routes";
import { roles } from '../utils/constants';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isErrored, isSuccess, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isErrored) {
      errorToast(errorMessage);
    }

    if (isSuccess || user) {
      successToast("Login successful");
      let navigateTo = (user?.role === roles.orgAdmin || user?.role === roles.orgSuperAdmin) ? ADMIN_DASHBOARD_ROUTE : user?.role === roles.eng ? ENG_DASHBOARD_ROUTE : HOME_ROUTE;
      navigate(navigateTo, { replace: true });
    }

    dispatch(reset());
  }, [user, isErrored, isSuccess, errorMessage, navigate, dispatch]);

  const onChange = e => setFormData(prevState => ({
    ...prevState,
    [e.target.name]: e.target.value
  }));

  const onSubmit = e => {
    e.preventDefault();

    if (!email || !password) {
      errorToast("Please fill all fields");
    } else {
      const userData = {
        email,
        password
      };

      dispatch(login(userData));
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="md:container mx-auto p-4 md:p-0">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  value={password}
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to={REGISTER_ROUTE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login