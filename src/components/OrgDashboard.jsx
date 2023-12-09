import React, { useState, useEffect } from 'react';
import ROLES from '../constants/roles.js';
import Alert from './Alert.jsx';
import MembersModal from './MembersModal.jsx';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useParams } from 'react-router-dom';
import { ArrowRightCircle } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';


const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{1,23}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const NIC_REGEX = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;

const REGISTER_FOR_ORG = '/org-api/registerForOrg';

const OrgDashboard = () => {

    const { currentUser } = useAuth();
    const { id } = useParams();    

    const GET_ORG_DETAILS = `/orgs/${id}`;
    const GET_ORG_EVENTS = `/orgs/${id}/events`;

    const [currentOrg, setCurrentOrg] = useState(null);
    
    const [events, setEvents] = useState([]);
    const [eventSearchTerm, setEventSearchTerm] = useState('');

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [nic, setNic] = useState('');
    const [validNic, setValidNic] = useState(false);
    const [nicFocus, setNicFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [enquiry, setEnquiry] = useState('');
    const [enquiryFocus, setEnquiryFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const getOrgDetails = async () => {
        try {
            const res = await axios.get(GET_ORG_DETAILS);
            if (!res.data) throw new Error("No Organizations Found");
            console.log(res.data);
            setCurrentOrg(res.data);
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getOrgDetails();
    }, []);

    useEffect(() => {
        // const result = NAME_REGEX.test(name);
        setValidName(true);
    }, [name]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = NIC_REGEX.test(nic);
        setValidNic(result);
    }, [nic]);

    useEffect(() => {
        const result = PHONE_REGEX.test(phone);
        setValidPhone(result);
    }, [phone]);

    useEffect(() => {
        setErrMsg('');
    }, [name, email, phone, nic]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const v1 = NAME_REGEX.test(name);
        const v2 = PHONE_REGEX.test(phone);
        const v3 = EMAIL_REGEX.test(email);
        const v4 = NIC_REGEX.test(nic);
        if (!v1 || !v2 || !v3 || !v4){
            setErrMsg("Invalid Entry");
            return;
        }
    }

    const getLastUpdated = (timestampString) => {
        const timestamp = new Date(timestampString);
        const now = new Date();

        const diff = now - timestamp;

        // Calculate days and remaining minutes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const minutes = Math.floor(diff / (1000 * 60)) % 60;

        return `Last updated ${days ? days + ' days and ' : ''}${minutes} minutes ago.`;
    }

    const eventArr = [
        {
            id: 1,
            name: "Engineering Summit 2023",
            provider: "EngineerTech Academy",
            description: "Join us at the Engineering Summit 2023 for insightful sessions and workshops. Explore the latest trends and advancements in engineering.",
            lastUpdated: "2023-12-01 09:45:00"
        },
        {
            id: 2,
            name: "InnovateEngineering Conference",
            provider: "InnovateEngineering Solutions",
            description: "The InnovateEngineering Conference is your opportunity to engage with leading experts and discover innovative solutions in engineering.",
            lastUpdated: "2023-11-28 15:20:00"
        },
        {
            id: 3,
            name: "Global Engineers Forum",
            provider: "Global Engineers Network",
            description: "Connect with engineers from around the world at the Global Engineers Forum. A platform for knowledge exchange and networking.",
            lastUpdated: "2023-11-25 12:10:00"
        },
        {
            id: 4,
            name: "TechPro Development Symposium",
            provider: "TechPro Development Hub",
            description: "TechPro Development Symposium offers a comprehensive exploration of the latest developments and skills in engineering.",
            lastUpdated: "2023-12-02 18:55:00"
        },
        {
            id: 5,
            name: "Innovative Engineering Expo",
            provider: "Innovative Engineering Academy",
            description: "Experience the future of engineering at the Innovative Engineering Expo. Discover groundbreaking technologies and projects.",
            lastUpdated: "2023-12-03 14:30:00"
        },
        {
            id: 6,
            name: "FutureTech Engineers Convention",
            provider: "FutureTech Engineers Institute",
            description: "The FutureTech Engineers Convention is a convergence of engineering minds. Explore the possibilities of future technologies.",
            lastUpdated: "2023-11-27 10:05:00"
        },
        {
            id: 7,
            name: "NexGen Engineering Summit",
            provider: "NexGen Engineering Solutions",
            description: "NexGen Engineering Summit brings together experts to discuss the next generation of engineering solutions and practices.",
            lastUpdated: "2023-11-30 16:40:00"
        }
    ]

    // just filter by name or provider for now
    const filteredEvents = events.filter((event) => {
        return event.name.toLowerCase().includes(eventSearchTerm.toLowerCase());
    });

    const getOrgEvents = async () => {
        try {
            const res = await axios.get(GET_ORG_EVENTS);
            if (!res.data) throw new Error("No Events Found");
            setEvents(res.data);
        } catch (err) {
            console.log(err.message);
            toast.error(err.message);
        }
    }

    useEffect(() => {
        getOrgEvents();
        setEvents(eventArr);
    }, []);

    return (
        <div className='container-fluid org-dashboard col-10 m-0 mx-auto p-0 position-relative'>
            <ToastContainer />
            <section className="org-dashboard-title my-5">
                <h1 className='display-6 my-3'>{currentOrg !== null ? currentOrg?.orgName : 'Error'}</h1>
                {/* maybe a logo here */}
                <div className={`card border-0 rounded shadow p-3 my-3`}>
                    <div className="card-body">
                        <p className='light'>{currentOrg !== null ? currentOrg?.description : 'Error'}</p>
                    </div>
                </div>
                {/* remember to add this ->  && currentUser?.orgID === currentOrg.id */}
                {(currentUser && currentUser?.role !== ROLES.eng) ? <>
                    <div className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#members-modal">See Members' Info
                        <ArrowRightCircle className='ms-2' />
                    </div>
                    <MembersModal />
                </> : null}
            </section>

            <section className='content'>
                <div className="row mb-3">
                    <p className='fs-4'>Apply for the Organization</p>
                    <form className='form needs-validation col-12 col-md-6 col-lg-5 text-center text-sm-start' onSubmit={handleSubmit} noValidate>
                        {errMsg && <div className='col-12'><Alert msg={errMsg} /></div>}
                        <div className="form-floating text-secondary mb-3">
                            <input 
                                type="text"
                                className={`form-control border-1 rounded-5 ${!name ? "" : validName ? "is-valid" : "is-invalid"}`}
                                id="fullname"
                                autoComplete='off'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                required
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                                placeholder='exampleName'
                            />
                            <label className='form-label' htmlFor="fullname">Full Name</label>
                            <p id="uidnote" className={nameFocus && name && !validName ? "invalid-feedback text-start" : "offscreen"}>
                                2 to 24 characters. <br />
                                Must begin with a letter. <br />
                                Letters, numbers, underscores, hyphens allowed
                            </p>
                        </div>
                        
                        <div className="form-floating text-secondary mb-3">
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
                                placeholder='example@email.com'
                            />
                            <label className='form-label' htmlFor="email">Email</label>
                            <p id="emailnote" className={emailFocus && email && !validEmail ? "invalid-feedback text-start" : "offscreen"}>
                                Not a valid Email
                            </p>
                        </div>

                        <div className="form-floating text-secondary mb-3">
                            <input 
                                type="text"
                                className={`form-control border-1 rounded-5 ${!nic ? "" : validNic ? "is-valid" : "is-invalid"}`}
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

                        <div className="form-floating text-secondary mb-3">
                            <input 
                                type="text"
                                className={`form-control border-1 rounded-5 ${!phone ? "" : validPhone ? "is-valid" : "is-invalid"}`}
                                id="phone"
                                autoComplete='off'
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                                required
                                onFocus={() => setPhoneFocus(true)}
                                onBlur={() => setPhoneFocus(false)} 
                                placeholder='0714563476'
                            />
                            <label className='form-label' htmlFor="phone">Contact No.</label>
                            <p id="phonenote" className={phoneFocus && phone && !validPhone ? "invalid-feedback text-start" : "offscreen"}>
                                Not a phone Number
                            </p>
                        </div>

                        <div className="form-floating text-secondary mb-3">
                            <textarea 
                                type="text"
                                className={`form-control border-1 rounded-5`}
                                id="enquiry"
                                autoComplete='off'
                                onChange={e => setEnquiry(e.target.value)}
                                value={enquiry}
                                onFocus={() => setEnquiryFocus(true)}
                                onBlur={() => setEnquiryFocus(false)} 
                                placeholder='enquiry'
                                style={{height: '100px'}}
                            ></textarea>
                            <label className='form-label' htmlFor="enquiry">Enquiry</label>
                        </div>

                        <button className='col-6 col-md-4 btn btn-outline-dark mt-2 rounded-5 p-2' disabled={!validName || !validEmail || !validPhone ? true : false}>Apply</button>
                    </form>
                </div>
            </section>

            <section className="event-section my-3">
                <div className="row mb-3">
                    {/* add pagination here with having 3 rows of event cards */}
                    <h1 className='display-6 my-3'>CPD Courses & Workshops</h1>
                    <div className="row my-2">
                        <div className="search-bar col-10 col-lg-6 pe-0 mx-auto mx-sm-0 my-2">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                className="form-control form-input" 
                                placeholder='Search Event...'
                                onChange={e => setEventSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3 p-3 p-sm-0 mx-auto">
                            {
                                filteredEvents.length > 0 ? filteredEvents.map((event, index) => {
                                    return (
                                        <div className="col" key={index}>
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h5 className="fs-4">{event.name}</h5>
                                                    <p className="card-text">{event.description}</p>
                                                    <button className="btn btn-outline-dark">Read more...</button>
                                                </div>
                                                <div className="card-footer">
                                                    <small className="text-muted">{getLastUpdated(event.lastUpdated)}</small>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                ) : (
                                    <div className="col-10 col-lg-6 my-3">
                                        <Alert msg={'No Events Found'} />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>


            </section>
        </div>
    );
}

export default OrgDashboard;