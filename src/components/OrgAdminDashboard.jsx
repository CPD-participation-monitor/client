import React, { useState, useEffect } from 'react';
import OrgModal from './OrgModal.jsx';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const GET_ORGS_URL = '/api-org/getOrgs';
const GET_REQUESTS_URL = '/api-org/getRequests';

const OrgAdminDashboard = () => {
    const { currentUser } = useAuth();

    const [errMsg, setErrMsg] = useState('');
    const [successOrg, setSuccessOrg] = useState(false);

    const [orgs, setOrgs] = useState([]);
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
                }
            );
            const orgs = response?.data?.orgs;
            const successRes = response?.data?.success;
            const reason = response?.data?.reason;
            // console.log(role);

            // check if orgs is empty
            if (orgs.length == 0){
                setErrMsg('No organizations to be found');
            }
            if (!successRes){
                setErrMsg(reason);
            }
            setSuccessOrg(successRes);
            setOrgs(orgs);

        } catch (err){
            setErrMsg('Something went wrong');
            setSuccessOrg(false);
        }
    }

    // const getRequests = async () => {
            
    //     try{
    //         const response = await axios.get(GET_REQUESTS_URL,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 withCredentials: true
    //             }
    //         );
    //         const successRes = response?.data?.success;
    //         const reason = response?.data?.reason;
    //         const requests = response?.data?.requests;
    //         // console.log(role);

    //         if (!successRes){
    //             setErrMsg(reason);
    //             setSuccess(successRes);
    //         }

    //         setSuccess(successRes);
    //         console.log(orgs);
    //         setOrgs(orgs);

    //     } catch (err){
    //         setErrMsg('Something went wrong');
    //         setSuccess(false);
    //     }
    // }

    useEffect(() => {
        // console.log('OrgAdminDashboard');
        getOrgs();
    }, []);

    return (
        <div className='container-fluid org-admin-dashboard col-12 m-0 mx-4 p-0'>
            <section className="title-section my-5 pt-5">
                <h1 className='display-6 my-5 pt-5'>Admin Dashboard</h1>
            </section>

            <section className='content'>
                <div className="row">
                    <p>Create an organization or join an existing organization</p>
                </div>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <button className="create-org btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#create-org-modal">Create Organization</button>
                        <OrgModal creator={currentUser?.user} />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-row'>
                        <div className="search-bar col-10 col-lg-6 mx-2">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                className="form-control form-input" 
                                placeholder='Search organizations...'
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-10 mx-auto text-center my-5">
                        {successOrg ? <table className='col-12 my-5 table table-striped table-hover'>
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
                                                    <button className="btn btn-outline-dark mx-2">View</button>
                                                    <button className="btn btn-outline-dark mx-2">Join</button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table> : <span className='text-center my-5 text-danger'>{errMsg ? errMsg : "No organizations to be found"}</span>}
                    </div>
                </div>

                <div className='row'>
                    <section className="title-section">
                        <h1 className='display-6'>Requests</h1>
                    </section>
                    <div className='col-12 col-md-6 d-flex flex-row my-5'>
                        <div className="search-bar col-10 col-lg-6 mx-2">
                            <input 
                                type="text" 
                                name="search" 
                                id="search" 
                                className="form-control form-input" 
                                placeholder='Search requests...'
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 mx-auto text-center my-5">
                            {/* {success ? <table className='col-12 my-5 table table-striped table-hover'>
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
                                        filteredRequests.map(admin => {
                                            return (
                                                <tr key={admin.id}>
                                                    <td>{admin.name}</td>
                                                    <td>{admin.id}</td>
                                                    <td>{admin.email}</td>
                                                    <td>{admin.members}</td>
                                                    <td>
                                                        <button className="btn btn-outline-dark mx-2">View</button>
                                                        <button className="btn btn-outline-dark mx-2">Join</button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table> : <span className='text-center my-5 text-danger'>{errMsg ? errMsg : "No organizations to be found"}</span>} */}
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default OrgAdminDashboard;