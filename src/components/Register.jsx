import React from 'react';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import axios from '../api/axios';

import { images } from '../javascript/imageImports.js';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const REGISTER_URL = '/register';

const Register = () => {

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        // console.log(result);
        // console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        // console.log(result);
        // console.log(pwd);
        setValidPwd(result);
        const match = (pwd === matchPwd);
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3){
            setErrMsg("Invalid Entry");
            return;
        }
        // console.log(user, pwd);
        // setSuccess(true);
        try{
            const payload = {
                user,
                email,
                pwd
            }
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify(payload),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            console.log(response.data);
            // console.log(response.accessToken);
            // console.log(JSON.stringify(response));
            setSuccess(true);
            // clear the input fields
        }catch (err){
            // optional chaining to safely access nested properties of an object
            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 409){
                setErrMsg('Username Taken');
                setUser('');
            }
            else{
                setErrMsg('Registration Failed');
            }
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <div className="container container-fluid col-4 text-center">
                        <div className="success card bg-light mx-auto px-md-5 px-1 py-5">
                            <div className="card-title display-6 text-uppercase text-center">
                                Success!
                            </div>
                            <span className='card-body'>
                                <HashLink to="/login">Sign In</HashLink>
                            </span>
                        </div>
                    </div>
                </section>
            ) : (
                <div className='register container-fluid col-12 px-0' style={{backgroundImage: `url(${images.bg_jungle_landscape})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <div className="card bg-light mx-auto border-0 rounded-5 shadow col-8 d-flex flex-row position-absolute">
                        <div className="title-section col-6">
                            <div className="img-container">
                                <img className='img-fluid p-5' src={images.signup} alt="register" />
                            </div>
                        </div>
                        <div className="form-section col-6 text-center">
                            <p className={`mx-auto ${errMsg ? "errmsg" : "offscreen"}`}>{errMsg}</p>
                            <div className="card-title">
                                <h1 className='text-uppercase p-5'>Register</h1>
                            </div>
                            <div className="card-body px-5">
                                <form className='form needs-validation' onSubmit={handleSubmit} noValidate>
                                    <div className="form-floating text-secondary mb-4">
                                        <input 
                                            type="text"
                                            className={`form-control border-0 rounded-5 ${!user ? "" : validName ? "is-valid" : "is-invalid"}`}
                                            id="username"
                                            autoComplete='off'
                                            onChange={e => setUser(e.target.value)}
                                            value={user}
                                            required
                                            onFocus={() => setUserFocus(true)}
                                            onBlur={() => setUserFocus(false)}
                                            placeholder='exampleUsername'
                                        />
                                        <label className='form-label' htmlFor="username">Username</label>
                                        <p id="uidnote" className={userFocus && user && !validName ? "invalid-feedback text-start" : "offscreen"}>
                                            4 to 24 characters. <br />
                                            Must begin with a letter. <br />
                                            Letters, numbers, underscores, hyphens allowed
                                        </p>
                                    </div>

                                    <div className="form-floating text-secondary mb-4">
                                        <input 
                                            type="email"
                                            className={`form-control border-0 rounded-5 ${!email ? "" : validEmail ? "is-valid" : "is-invalid"}`}
                                            id="email"
                                            autoComplete='off'
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)} 
                                            placeholder='example@email.com'
                                        />
                                        <label className='form-label' htmlFor="email">Email</label>
                                        <p id="emailnote" className={emailFocus && email && !validEmail ? "invalid-feedback text-start" : "offscreen"}>
                                            Not a valid Email
                                        </p>
                                    </div>

                                    <div className="form-floating text-secondary mb-4">
                                        <input 
                                            type="password"
                                            className={`form-control border-0 rounded-5 ${!pwd ? "" : validPwd ? "is-valid" : "is-invalid"}`}
                                            id="password"
                                            onChange={e => setPwd(e.target.value)}
                                            required
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)}
                                            placeholder='examplePassword'
                                        />
                                        <label className='form-label' htmlFor="password">Password</label>
                                        <p id="pwdnote" className={pwdFocus && !validPwd ? "invalid-feedback text-start" : "offscreen"}>
                                            8 to 24 characters. <br />
                                            Must include uppercase and lowercase letters, a number and a special character. <br />
                                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                        </p>
                                    </div>

                                    <div className="form-floating text-secondary mb-4">
                                        <input 
                                            type="password"
                                            className={`form-control border-0 rounded-5 ${!matchPwd ? "" : validMatchPwd ? "is-valid" : "is-invalid"}`}
                                            id="matchPwd"
                                            onChange={e => setMatchPwd(e.target.value)}
                                            required
                                            onFocus={() => setMatchPwdFocus(true)}
                                            onBlur={() => setMatchPwdFocus(false)}
                                            placeholder='exampleMatchPassword'
                                        />
                                        <label className='form-label' htmlFor="matchPwd">Confirm Password</label>
                                        <p id="matchPwdNote" className={matchPwdFocus && !validMatchPwd ? "invalid-feedback text-start" : "offscreen"}>
                                            Must match the first password input field.
                                        </p>
                                    </div>

                                    <button className='col-4 btn btn-outline-dark mt-2 rounded-5 p-2' disabled={!validName || !validPwd || !validMatchPwd ? true : false}>Sign Up</button>
                                </form>
                                <p className='mt-4'>
                                    Already Registered? <br />
                                    <span>
                                        <HashLink className='text-decoration-none' to="/login">Sign In</HashLink>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );  
}

export default Register;