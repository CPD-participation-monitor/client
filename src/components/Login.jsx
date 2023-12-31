import React from 'react';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

import { images } from '../javascript/imageImports.js';
import ROLES from '../constants/roles';

const LOGIN_URL = '/login';

const Login = () => {
    const { currentUser, dispatch } = useAuth();

    useEffect(() => {
        if (currentUser?.user){
            if (currentUser?.user?.role === ROLES.orgSuperAdmin){
                navigate('/superadmindash', { replace: true });
            }else if (currentUser?.user?.role === ROLES.orgAdmin || currentUser?.user?.role === ROLES.orgSuperAdmin){
                navigate('/orgadmindash', { replace: true });
            }else if (currentUser?.user?.role === ROLES.eng){
                navigate('/engdash', { replace: true });
            }
        }
    });

    const navigate = useNavigate();
    // const location = useLocation();
    // from is the page the user was trying to access before being redirected to login
    // const from = location.state?.from?.pathname || '/';

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const payload = {
                email,
                password: pwd
            }
            const response = await axios.post(LOGIN_URL,
                JSON.stringify(payload), 
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            const success = response?.data?.success;
            const reason = response?.data?.reason;
            const user = response?.data?.user;
            console.log(response?.data?.user);

            if (!success) {
                console.log(reason);
                throw new Error(reason);
            }
            dispatch({ type: "LOGIN", payload: { success, user } });
            // navigate the user to the page they were trying to access before being redirected to login
            const navigateTo = (user?.role === ROLES.orgAdmin || user?.role === ROLES.orgSuperAdmin) ? '/orgadmindash' : user?.role === ROLES.eng ? '/engdash' : '/';
            navigate(navigateTo, { replace: true });

        }catch (err){
            if (!err?.response){
                setErrMsg('No Server Response');
            }
            else{
                setErrMsg('Login Failed');
            }
        }
    }

    const handleShowPassword = () => {
        const password = document.querySelector('#password');
        const eye = document.querySelector('.eyefill');
        const eyeSlash = document.querySelector('.eyefillslash');
        password.type = 'text';
        eye.classList.add('d-none');
        eyeSlash.classList.remove('d-none');
    }

    const handleHidePassword = () => {
        const password = document.querySelector('#password');
        const eye = document.querySelector('.eyefill');
        const eyeSlash = document.querySelector('.eyefillslash');
        password.type = 'password';
        eye.classList.remove('d-none');
        eyeSlash.classList.add('d-none');
    }

    return (
        <div className='login container-fluid col-12 row m-0 p-0 position-relative' style={{backgroundImage: `url(${images.abstract_bg_6})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="row m-0 p-0">
                <div className="col-12 col-sm-10 m-0 p-0 mx-auto d-flex align-items-center">
                    <div className="card bg-light m-0 mx-auto p-5 px-sm-3 border-0 rounded-5 shadow col-10 col-md-8 col-lg-6 d-flex flex-row">
                        <div className="form-section col-10 col-md-6 mx-auto text-center">
                            <div className="card-title">
                                <h1 className="text-uppercase p-3 px-2">
                                    Login
                                </h1>
                            </div>
                            <p className={`mx-auto ${errMsg ? "errmsg" : "offscreen"}`}>{errMsg}</p>
                            <div className="card-body p-3">
                                <form className='form needs-validation' onSubmit={handleSubmit} noValidate>
                                    <div className="form-floating text-secondary mb-4">
                                        <input 
                                            type="email"
                                            className='form-control border-0 rounded-5'
                                            id="email"
                                            autoComplete='off'
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            placeholder='examlple@email.com'
                                            required
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>

                                    <div className="form-floating text-secondary mb-4">
                                        <input 
                                            type="password"
                                            className='form-control border-0 rounded-5'
                                            id="password"
                                            onChange={e => setPwd(e.target.value)}
                                            value={pwd}
                                            placeholder='password'
                                            required
                                        />
                                        <label className='form-label' htmlFor="password">Password</label>
                                        <div className="input-group"></div>
                                    </div>

                                    <button className='col-4 btn btn-outline-dark mt-2 rounded-5 p-2' disabled={!email || !pwd ? true : false}>Sign In</button>
                                </form>
                                <p className='mt-4'>
                                    Need an Account? <br />
                                    <span>
                                        <HashLink className='text-decoration-none' to="/register">Sign Up</HashLink>
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="title-section col-6 d-none d-md-block">
                            <div className="img-container d-flex justify-items-center">
                                <img className='img-fluid p-5' src={images.login} alt="login" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;