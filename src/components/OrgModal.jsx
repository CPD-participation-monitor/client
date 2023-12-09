import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const CREATE_ORG_URL = '/api-org/createOrganization';

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const ORG_NAME_REGEX = /^([a-zA-Z0-9\s{}[\]()@#&!]+)$/;

const OrgModal = ({ creator }) => {

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [orgName, setOrgName] = useState('');
    const [validOrgName, setValidOrgName] = useState(false);
    const [orgNameFocus, setOrgNameFocus] = useState(false);

    const [orgDescription, setOrgDescription] = useState('');
    const [validOrgDescription, setValidOrgDescription] = useState(false);
    const [orgDescriptionFocus, setOrgDescriptionFocus] = useState(false);
    const [orgDescriptionCharsCount, setOrgDescriptionCharsCount] = useState(0);

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

    useEffect(() => {
        const result = orgDescriptionCharsCount <= 500;
        setValidOrgDescription(result);
    }, [orgDescription]);

    const handleSubmitOrg = async (e) => {
        e.preventDefault();

        const v1 = ORG_NAME_REGEX.test(orgName);
        const v2 = EMAIL_REGEX.test(email);
        const v3 = orgDescriptionCharsCount <= 500;

        if (!v1 || !v2 || !v3){
            setErrMsg('Invalid Entry');
            return;
        }
        
        try{
            const payload = {
                orgName,
                email,
                creatorEmail: creator?.email,
                orgDescription
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
            const successRes = response?.data?.success;
            const reason = response?.data?.reason;

            if (!success) {
                console.log(reason);
                throw new Error(reason);
            }
            console.log(JSON.stringify(response?.data));
            setSuccess(successRes);
            

        }catch (err){
            if (!err?.response){
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400){
                setErrMsg('Invalid Entry');
            }
            else if (err.response?.status === 401){
                setErrMsg('Unauthorized');
            }
            else if (err.response?.status === 409){
                setErrMsg('Organization already exists');
            }
            else{
                setErrMsg('Something went wrong');
            }
        }
    }

    return (
        <div className="modal fade create-org-form p-5" id='create-org-modal' tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered col-10 col-md-6 col-lg-4 mx-auto text-center">
                <div className="modal-content p-4 px-5">
                    <h5 className="modal-title display-6 text-center my-3">Create Organization</h5>
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
                                    <p id="namenote" className={orgNameFocus && orgName && !validOrgName ? "invalid-feedback text-start" : "offscreen"}>
                                        Not a valid organization name
                                    </p>
                                </div>

                                <div className="form-floating text-secondary mb-4">
                                    <textarea 
                                        type="text"
                                        className={`form-control border-1 rounded-5 ${!orgDescription ? "" : validOrgDescription ? "is-valid" : "is-invalid"}`}
                                        id="orgDescription"
                                        onChange={e => {
                                            setOrgDescription(e.target.value);
                                            setOrgDescriptionCharsCount(e.target.value.length);
                                        }}
                                        value={orgDescription}
                                        required
                                        onFocus={() => setOrgDescriptionFocus(true)}
                                        onBlur={() => setOrgDescriptionFocus(false)} 
                                        placeholder='Organization Description'
                                        style={{height: '100px'}}
                                    ></textarea>
                                    <label className='form-label' htmlFor="orgDescription">Description</label>
                                    <span className={orgDescriptionFocus ? `badge mt-2 ${validOrgDescription ? "bg-success" : "bg-danger"}` : "offscreen"}>{500 - orgDescriptionCharsCount}</span>
                                    <p id="descnote" className={orgDescriptionFocus && orgDescription && !validOrgDescription ? "invalid-feedback text-start" : "offscreen"}>
                                        Too many characters
                                    </p>
                                </div>

                                <button className='col-4 btn btn-outline-dark mt-2 rounded-5 p-2' disabled={!email || !orgName || !validOrgDescription ? true : false}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default OrgModal;