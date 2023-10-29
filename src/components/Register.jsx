import React from 'react';
import { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import axios from '../api/axios';
import SuccessNotification from './SuccessNotification.jsx';
import { images } from '../javascript/imageImports.js';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const ORG_REGEX = /^([a-zA-Z0-9\s\{\}\[\]\(\)\@\#\&\!]+)$/;
const NIC_REGEX = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;

const REGISTER_URL = '/register';

const Register = ({ type }) => {

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [nic, setNic] = useState('');
    const [validNic, setValidNic] = useState(false);
    const [nicFocus, setNicFocus] = useState(false);

    const [orgName, setOrgName] = useState('');
    const [validOrgName, setValidOrgName] = useState(false);
    const [orgNameFocus, setOrgNameFocus] = useState(false);

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
        const result = NIC_REGEX.test(nic);
        setValidNic(result);
    }, [nic]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = ORG_REGEX.test(orgName);
        setValidOrgName(result);
    }, [orgName]);

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
    }, [user, nic, orgName, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = ORG_REGEX.test(orgName);
        const v5 = NIC_REGEX.test(nic);
        if (!v1 || !v2 || !v3 || !v4 || !v5){
            setErrMsg("Invalid Entry");
            return;
        }
        // console.log(user, pwd);
        // setSuccess(true);
        try{
            const payload = {
                username: user,
                email,
                password: pwd,
                orgName,
                nic
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
                <SuccessNotification />
            ) : (
                <div className='register container-fluid col-12 px-0' style={{backgroundImage: `url(${images.bg_jungle_landscape})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <div className="card bg-light mx-auto border-0 rounded-5 shadow col-8 d-flex flex-row position-absolute">
                        <div className="title-section col-5">
                            <div className="img-container">
                                <img className='img-fluid p-5' src={images.signup} alt="register" />
                            </div>
                        </div>
                        <div className="form-section col-md-7 col-10 mx-auto text-center">
                            <div className="card-title">
                                <h1 className='text-uppercase p-5 px-2'>Register</h1>
                            </div>
                            <p className={`mx-auto ${errMsg ? "errmsg" : "offscreen"}`}>{errMsg}</p>
                            <div className="card-body px-md-5 px-1">
                                <form className='form needs-validation' onSubmit={handleSubmit} noValidate>
                                    <div className="row g-2">
                                        <div className="col-lg">
                                            <div className="form-floating text-secondary mb-3">
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
                                        </div>

                                        <div className="col-lg">
                                            <div className="form-floating text-secondary mb-3">
                                                <input 
                                                    type="text"
                                                    className={`form-control border-0 rounded-5 ${!nic ? "" : validNic ? "is-valid" : "is-invalid"}`}
                                                    id="nic"
                                                    autoComplete='off'
                                                    onChange={e => setNic(e.target.value)}
                                                    value={nic}
                                                    required
                                                    onFocus={() => setNicFocus(true)}
                                                    onBlur={() => setNicFocus(false)} 
                                                    placeholder='976546758V | 19976546758'
                                                />
                                                <label className='form-label' htmlFor="nic">NIC</label>
                                                <p id="nicnote" className={nicFocus && nic && !validNic ? "invalid-feedback text-start" : "offscreen"}>
                                                    9 digits + V | 12 digits.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-floating text-secondary mb-3">
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

                                    {type === 'org' ? <div className="form-floating text-secondary mb-3">
                                        <input 
                                            type="text"
                                            className={`form-control border-0 rounded-5 ${!orgName ? "" : validOrgName ? "is-valid" : "is-invalid"}`}
                                            id="orgName"
                                            autoComplete='off'
                                            onChange={e => setOrgName(e.target.value)}
                                            value={orgName}
                                            required
                                            onFocus={() => setOrgNameFocus(true)}
                                            onBlur={() => setOrgNameFocus(false)}
                                            placeholder='exampleUsername'
                                        />
                                        <label className='form-label' htmlFor="orgName">Organization</label>
                                        <p id="uidnote" className={orgNameFocus && orgName && !validOrgName ? "invalid-feedback text-start" : "offscreen"}>
                                            Alphanumerics, curly, squared, angular brackets allowed<br />
                                            @, #, &, ! allowed.
                                        </p>
                                    </div> : null}

                                    <div className="row g-2">
                                        <div className="col-lg">
                                            <div className="form-floating text-secondary mb-3">
                                                <input 
                                                    type="password"
                                                    className={`form-control border-0 rounded-5 ${!pwd ? "" : validPwd ? "is-valid" : "is-invalid"}`}
                                                    id="password"
                                                    onChange={e => setPwd(e.target.value)}
                                                    value={pwd}
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
                                        </div>
                                        <div className="col-lg">
                                            <div className="form-floating text-secondary mb-3">
                                                <input 
                                                    type="password"
                                                    className={`form-control border-0 rounded-5 ${!matchPwd ? "" : validMatchPwd ? "is-valid" : "is-invalid"}`}
                                                    id="matchPwd"
                                                    onChange={e => setMatchPwd(e.target.value)}
                                                    value={matchPwd}
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
                                        </div>
                                    </div>



                                    <button className='col-4 btn btn-outline-dark mt-2 rounded-5 p-2' disabled={!validName || !validPwd || !validMatchPwd ? true : false}>Sign Up</button>
                                </form>
                                <p className='mt-2'>
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