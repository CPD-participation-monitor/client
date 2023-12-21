import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../utils/toasts';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { inputPatterns } from '../utils/regex';
import { LOGIN_ROUTE } from "../utils/routes";

const Register = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    nic: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const { fullname, nic, email, password, confirmPassword, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isErrored, isSuccess, errorMessage } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isErrored) {
      errorToast(errorMessage);
    }

    if (isSuccess || user) {
      successToast("Registration successful");
      navigate(LOGIN_ROUTE);
    }

    dispatch(reset());
  }, [user, isErrored, isSuccess, errorMessage, navigate, dispatch]);

  const onChange = e => setFormData(prevState => ({
    ...prevState,
    [e.target.name]: e.target.value
  }));

  const onSubmit = e => {
    e.preventDefault();
    // complete the validation messages
    if (!inputPatterns.name_regex.test(fullname)) {
      errorToast("name should contain min 3 and max 23 alphanumeric characters. _ allowed.");
    } else if (!inputPatterns.nic_regex.test(nic)) {
      errorToast("Invalid NIC");
    } else if (!inputPatterns.email_regex.test(email)) {
      errorToast("Invalid email");
    } else if (!inputPatterns.password_regex.test(password)) {
      errorToast("Invalid password");
    } else if (password !== confirmPassword) {
      errorToast("Passwords do not match");
    } else {
      const userData = {
        name: fullname,
        nic,
        email,
        password,
        role
      }
      dispatch(register(userData));
    }
  }

  if (isLoading) {
    console.log("Loading...");
    return <Spinner />
  }

  return (
    <div className="container mx-auto">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="fullname"
                  type="text"
                  autoComplete="off"
                  required
                  value={fullname}
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="nic" className="block text-sm font-medium leading-6 text-gray-900">
                NIC
              </label>
              <div className="mt-2">
                <input
                  id="nic"
                  name="nic"
                  type="text"
                  autoComplete="off"
                  required
                  value={nic}
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="off"
                  required
                  value={confirmPassword}
                  onChange={onChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            
            <div className="mt-6 text-center gap-x-4">
                <div className="flex items-center gap-x-3">
                  <input
                    id="engineer"
                    name="role"
                    type="radio"
                    value={'eng'}
                    onChange={onChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="engineer" className="block text-sm font-medium leading-6 text-gray-900">
                    Engineer
                  </label>
                </div>
                <div className="flex items-center gap-x-3 mt-3">
                  <input
                    id="organization"
                    name="role"
                    type="radio"
                    value={'orgAdmin'}
                    onChange={onChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="organization" className="block text-sm font-medium leading-6 text-gray-900">
                    Organization
                  </label>
                </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to={LOGIN_ROUTE} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register