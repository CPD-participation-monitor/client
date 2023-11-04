import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const CREATE_ORG_URL = '/createOrganization';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const ORG_NAME_REGEX = /^([a-zA-Z0-9\s\{\}\[\]\(\)\@\#\&\!]+)$/;

const OrgModal = () => {

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [orgName, setOrgName] = useState('');
    const [validOrgName, setValidOrgName] = useState(false);
    const [orgNameFocus, setOrgNameFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const result = ORG_NAME_REGEX.test(orgName);
        setValidOrgName(result);
    }, [orgName]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    const handleSubmitOrg = async (e) => {
        e.preventDefault();

        const v1 = ORG_NAME_REGEX.test(orgName);
        const v2 = EMAIL_REGEX.test(email);

        if (!v1 || !v2){
            setErrMsg('Invalid Entry');
            return;
        }
        
        try{
            const payload = {
                orgName,
                email
            }
            const response = await axios.post(CREATE_ORG_URL,
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
            // console.log(role);

            if (!success) {
                console.log(reason);
                throw new Error(reason);
            }
            console.log(JSON.stringify(response?.data));
            

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
        <div className="modal fade create-org-form p-5" id='create-org-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered col-10 col-md-6 col-lg-4 mx-auto text-center">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Organization</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p className={`mx-auto my-3 ${errMsg ? "errmsg" : "offscreen"}`}>{errMsg}</p>
                        <form className='form needs-validation' onSubmit={handleSubmitOrg} noValidate>
                                <div className="form-floating text-secondary mb-4">
                                    <input 
                                        type="email"
                                        className={`form-control border-1 rounded-5 ${!email ? "" : validEmail ? "is-valid" : "is-invalid"}`}
                                        id="email"
                                        autoComplete='off'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        onFocus={() => setEmailFocus(true)}
                                        onBlur={() => setEmailFocus(false)} 
                                        placeholder='examlple@email.com'
                                    />
                                    <label htmlFor="email">Email</label>
                                    <p id="uidnote" className={emailFocus && email && !validEmail ? "invalid-feedback text-start" : "offscreen"}>
                                        Not a valid email address
                                    </p>
                                </div>

                                <div className="form-floating text-secondary mb-4">
                                    <input 
                                        type="text"
                                        className={`form-control border-1 rounded-5 ${!orgName ? "" : validOrgName ? "is-valid" : "is-invalid"}`}
                                        id="orgName"
                                        onChange={e => setOrgName(e.target.value)}
                                        value={orgName}
                                        required
                                        onFocus={() => setOrgNameFocus(true)}
                                        onBlur={() => setOrgNameFocus(false)} 
                                        placeholder='Organization Name'
                                    />
                                    <label className='form-label' htmlFor="orgName">Organization Name</label>
                                    <p id="uidnote" className={orgNameFocus && orgName && !validOrgName ? "invalid-feedback text-start" : "offscreen"}>
                                        Not a valid organization name
                                    </p>
                                </div>

                                <button className='col-4 btn btn-outline-dark mt-2 rounded-5 p-2' disabled={!email || !orgName ? true : false}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OrgModal;