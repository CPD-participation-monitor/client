import React from 'react';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

import { images } from '../javascript/imageImports.js';

const LOGIN_URL = '/login';

const Login = () => {
    const { setAuth } = useAuth();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
            console.log(payload);
            // const response = await axios.post(LOGIN_URL,
            //     JSON.stringify(payload), 
            //     {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         withCredentials: true
            //     }
            // );

            setSuccess(true);
            const reason = 'test';
            // console.log(JSON.stringify(response?.data));
            // const success = response?.data?.success;
            // const reason = response?.data?.reason;
            if (!success) {
                console.log(reason);
                throw new Error(reason);
            }
            // console.log(JSON.stringify(response));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({ email, pwd, roles, accessToken });
            // setEmail('');
            // setPwd('');
            // setSuccess(true);
        }catch (err){
            if (!err?.response){
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password');
            }
            else if (err.response?.status === 401){
                setErrMsg('Unauthorized');
            }
            else{
                setErrMsg('Login Failed');
            }
        }
    }

    return (
        <div className='login container-fluid col-12 px-0' style={{backgroundImage: `url(${images.bg_jungle_landscape_2})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="card bg-light mx-auto border-0 rounded-5 shadow col-8 d-flex flex-row position-absolute">
                <div className="form-section col-md-6 col-10 mx-auto text-center">
                    <div className="card-title">
                        <h1 className="text-uppercase p-5 px-2">
                            Login
                        </h1>
                    </div>
                    <p className={`mx-auto ${errMsg ? "errmsg" : "offscreen"}`}>{errMsg}</p>
                    <div className="card-body px-md-5 px-1">
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
                <div className="title-section col-6">
                    <div className="img-container">
                        <img className='img-fluid p-5' src={images.login} alt="login" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;