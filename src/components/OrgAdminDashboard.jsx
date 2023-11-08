import React, { useState, useEffect } from 'react';
import OrgModal from './OrgModal.jsx';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import ROLES from '../constants/roles.js';

const GET_ORGS_URL = '/api-org/getOrgs';
const GET_REQUESTS_URL = '/api-org/getRequests';
const JOIN_REQUEST_URL = '/api-org/joinOrg';

const OrgAdminDashboard = () => {
    const { currentUser, dispatch } = useAuth();
    const navigate = useNavigate();

    const [errMsgOrg, setErrMsgOrg] = useState('');
    const [successOrg, setSuccessOrg] = useState(false);
    
    const [errMsgReq, setErrMsgReq] = useState('');
    const [successReq, setSuccessReq] = useState(false);

    const [errMsgJoin, setErrMsgJoin] = useState('');
    const [successJoin, setSuccessJoin] = useState(false);

    const [currentOrg, setCurrentOrg] = useState({});
    const [requestedOrgId, setRequestedOrgId] = useState('');

    const [orgs, setOrgs] = useState([]);
    // requests = [{id: '', admin: {name: '', id: '', email: '', nic: ''}}]
    const [requests, setRequests] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredOrgs = orgs.filter(org => {
        // check if the search term is included in the org name, email, members, or id
        return org.name.toLowerCase().includes(searchTerm.toLowerCase()) || org.email.includes(searchTerm.toLowerCase()) || org.members == searchTerm || org.id.includes(searchTerm.toString().toLowerCase());
    });

    const getOrgs = async () => {

        try{
            const response = await axios.get(GET_ORGS_URL,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                },
            );
            const orgs = response?.data?.orgs;
            const successRes = response?.data?.success;
            const reason = response?.data?.reason;
            
            // check if orgs is empty
            if (orgs.length == 0){
                setErrMsgOrg('No organizations to be found');
            }
            
            setSuccessOrg(successRes);
            setOrgs(orgs);

        } catch (err){
            if (err?.response?.status === 401){
                console.log('Unauthorized or Token is expired');
                setErrMsgOrg('Unauthorized');
                setSuccessOrg(false);
                dispatch({ type: "LOGOUT" });
            }
            else{
                setErrMsgOrg('Something went wrong');
                setSuccessOrg(false);
            }
        }
    }

    const filteredRequests = requests.filter(req => {
        return req.admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || req.admin.email.includes(searchTerm.toLowerCase()) || req.admin.nic.includes(searchTerm.toLowerCase()) || req.admin.id === searchTerm.toString().toLowerCase();
    });

    const getRequests = async () => {
            
        try{
            const response = await axios.post(GET_REQUESTS_URL,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                    payload: {
                        adminEmail: currentUser?.user?.email
                    }
                }
            );
            const successRes = response?.data?.success;
            const reason = response?.data?.reason;
            const requests = response?.data?.requests;

            if (requests.length == 0){
                setErrMsgReq('No pending requests');
            }

            setSuccessReq(successRes);
            setRequests(requests);

        } catch (err){
            if (err?.response?.status === 401){
                console.log('Unauthorized or Token is expired');
                setErrMsgReq('Unauthorized');
                setSuccessReq(false);
                // dispatch({ type: "LOGOUT" });
            }
            else{
                setErrMsgReq('Something went wrong');
                setSuccessReq(false);
            }
        }
    }

    useEffect(() => {
        getOrgs();
    }, []);

    // if the user is a super admin, get the requests
    useEffect(() => {
        if (currentUser?.user?.role === ROLES.orgSuperAdmin){
            getRequests();
        }
    }, []);

    // find and set the current org
    useEffect(() => {
        const orgID = currentUser?.user?.orgID;
        if (orgID){
            const currentUserOrg = orgs.find(org => org.id === orgID.toString());
            console.log(currentUserOrg);
            setCurrentOrg(currentUserOrg);
        }
    }, [orgs]);

    const handleJoin = async (e) => {
        try{
            const orgID = e.target.value;
            const adminID = currentUser?.user?.id;
            const adminEmail = currentUser?.user?.email;
            const adminName = currentUser?.user?.name;
            const adminNIC = currentUser?.user?.nic;
            const admin = {id: adminID, email: adminEmail, name: adminName, nic: adminNIC};
            const payload = {orgID, admin};
            // const response = await axios.post(JOIN_REQUEST_URL,
            //     {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         withCredentials: true,
            //         payload
            //     }
            // );
            const response = 'test';
            const successRes = response?.data?.success;
            const reason = response?.data?.reason;

            // if (!successRes){
            //     setErrMsgJoin(reason);
            //     setSuccessJoin(false);
            //     return;
            // }

            setSuccessJoin(true);
            setRequestedOrgId(orgID);

        }catch (err){
            if (err?.response?.status === 401){
                console.log('Unauthorized or Token is expired');
                setErrMsgJoin('Unauthorized');
                setSuccessJoin(false);
                // dispatch({ type: "LOGOUT" });
            }
            else{
                setErrMsgJoin('Something went wrong');
                setSuccessJoin(false);
            }
        }
    };

    return (
        <div className='container-fluid org-admin-dashboard col-10 m-0 mx-auto p-0'>
            <section className="admin-dashboard-title my-5">
                <h1 className='display-6'>{currentOrg?.name ? currentOrg?.name + " - Admin Dashboard" : "Admin Dashboard"}</h1>
            </section>

            <section className='content'>
                <div className="row mb-3">
                    <p>Create an organization or join an existing organization</p>
                    {/* Only an admin can create an organization */}
                    {currentUser?.user?.role !== ROLES.orgSuperAdmin ? 
                    <div className='col-10 col-md-3'>
                        <button className="create-org btn btn-outline-dark col-10 mx-auto" data-bs-toggle="modal" data-bs-target="#create-org-modal">Create Organization</button>
                        <OrgModal creator={currentUser?.user} />
                    </div> : 
                    <div className='col-10 col-md-3'>
                        <button className="create-org btn btn-outline-dark col-10 mx-auto" onClick={(e) => navigate(`/orgadmindash/orgdash/${currentOrg?.orgID}`)} >View Organization</button>
                    </div>}
                </div>

                <div className="row my-3">
                    <div className="search-bar col-10 col-lg-6 mx-auto my-3">
                        <input 
                            type="text" 
                            name="search" 
                            id="search" 
                            className="form-control form-input" 
                            placeholder='Search organizations...'
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-10 mx-auto text-center table-responsive">
                        {!errMsgOrg ? <table className='col-12 mt-3 mb-5 table table-striped table-hover align-middle'>
                            <thead className='my-2'>
                                <tr>
                                    <th scope="col">Organization Name</th>
                                    <th scope="col">Organization ID</th>
                                    <th scope="col">Organization Email</th>
                                    <th scope="col">Members</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='my-2'>
                                {
                                    filteredOrgs.map(org => {
                                        return (
                                            <tr key={org.id}>
                                                <td>{org.name}</td>
                                                <td>{org.id}</td>
                                                <td>{org.email}</td>
                                                <td>{org.members}</td>
                                                <td>
                                                    <button className="btn btn-outline-dark mx-2" onClick={(e) => navigate(`/orgadmindash/orgdash/${org.id}`)}>View</button>
                                                    {currentUser?.user?.role !== ROLES.orgSuperAdmin && !successJoin ? <button className="btn btn-outline-dark mx-2" value={org.id} onClick={(e) => handleJoin(e)}>Join</button> : (requestedOrgId === org.id) ? <small className='text-muted fst-italic'>Request sent</small> :null}
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table> : <span className='text-center my-5 text-danger'>{errMsgOrg}</span>}
                    </div>
                </div>
            </section>

            {currentUser?.user?.role === ROLES.orgSuperAdmin ? <>
                <section className="request-title-section">
                    <h1 className='display-6'>Requests</h1>
                </section>

                <section className="content">
                    <div className="row mt-5">
                        <div className="search-bar col-10 col-lg-6 mx-auto">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                className="form-control form-input" 
                                placeholder='Search requests...'
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="col-10 mx-auto text-center my-5 table-responsive">
                            {!errMsgReq ? <table className='col-12 my-5 table table-striped table-hover align-middle'>
                                <thead className='my-2'>
                                    <tr>
                                        <th scope="col">Request ID</th>
                                        <th scope="col">Admin Name</th>
                                        <th scope="col">Admin ID</th>
                                        <th scope="col">Admin Email</th>
                                        <th scope="col">Admin NIC</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='my-2'>
                                    {
                                        filteredRequests.map(req => {
                                            return (
                                                <tr key={req.id}>
                                                    <td>{req.id}</td>
                                                    <td>{req.admin.name}</td>
                                                    <td>{req.admin.id}</td>
                                                    <td>{req.admin.email}</td>
                                                    <td>{req.admin.nic}</td>
                                                    <td>
                                                        <button className="btn btn-outline-success mx-2">Approve</button>
                                                        <button className="btn btn-outline-danger mx-2">Decline</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table> : <span className='text-center my-5 text-danger'>{errMsgReq}</span>}
                        </div>
                    </div>
                </section>
            </> : null}
            
        </div>
    );
}

export default OrgAdminDashboard;