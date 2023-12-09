import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import useSharedState from '../hooks/useSharedState';

const CPDDashboard = () => {

    const GET_ALL_ORGS = '/getOrgDetails';

    const navigate = useNavigate();
    // const [type, setType] = useState('provider');
    const [orgs, setOrgs] = useState([]);
    // const [events, setEvents] = useState([]);
    const [orgSearchTerm, setOrgSearchTerm] = useState('');
    // const [eventSearchTerm, setEventSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const getLastUpdated = (timestampString) => {
        const timestamp = new Date(timestampString);
        const now = new Date();

        const diff = now - timestamp;

        // Calculate days and remaining minutes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const minutes = Math.floor(diff / (1000 * 60)) % 60;

        return `Last updated ${days ? days + ' days and ' : ''}${minutes} minutes ago.`;
    }

    // just filter by name for now
    const filteredOrgs = orgs.filter((org) => {
        return org?.orgName.toLowerCase().includes(orgSearchTerm.toLowerCase());
    });

    const getAllOrgs = async () => {
        try {
            const response = await axios.get(GET_ALL_ORGS);
            console.log(response?.data);
            if (response?.data?.orgs.length === 0) {
                setErrorMsg('No Organisations Found.');
            } else {
                setErrorMsg('');
                setOrgs(response?.data?.orgs);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllOrgs();
    }, []);

    return (
        <div className='container col-12 m-0 p-0 mx-auto'>
            <ToastContainer />
            <div className="search-section row col-12 mx-0">
                <form className='row g-3 d-flex pt-5 mx-auto'>
                    <div className="search-bar col-md-8">
                        <input type="text" name="search" id="search" className="form-control form-input" placeholder='Type here...' onChange={(e) => {
                            setOrgSearchTerm(e.target.value);
                        }} />
                    </div>
                </form>
            </div>
            
            <div className="results-section row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5 my-5 p-3">
                {errorMsg !== '' ? <span className='text-danger fs-4'>{errorMsg}</span> : filteredOrgs.map((org, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="fs-4">{org?.orgName}</h5>
                                    <p className="card-text">{org?.description}</p>
                                    <button className="btn btn-outline-dark" onClick={(e) => {
                                        navigate(`orgdash/${org?.orgID}`);
                                    }}>Read more...</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{getLastUpdated(org.lastUpdated)}</small>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CPDDashboard;