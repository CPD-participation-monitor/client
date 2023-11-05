import React, { useState, useEffect } from 'react';
import OrgModal from './OrgModal.jsx';
import axios from '../api/axios';

const GET_ORGS_URL = '/api-org/getOrgs';

const OrgAdminDashboard = () => {

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [orgs, setOrgs] = useState([]);

    const getOrgs = async (e) => {
        e.preventDefault();

        const orgs = [];

        try{
            const response = await axios.get(GET_ORGS_URL,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
            const successRes = response?.data?.success;
            const reason = response?.data?.reason;
            const orgs = response?.data?.orgs;
            // console.log(role);

            if (!successRes){
                setErrMsg(reason);
                setSuccess(successRes);
            }

            setSuccess(successRes);
            setOrgs(orgs);

        } catch (err){
            setErrMsg('Something went wrong');
            setSuccess(false);
        }
    }

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
                        <OrgModal />
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-row'>
                        <div className="search-bar col-10 col-lg-6 mx-2">
                            <input type="text" name="search" id="search" className="form-control form-input" placeholder='Type here...' />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 mx-auto text-center my-5">
                        {success ? <table className='col-12 my-5 table table-striped table-hover'>
                            <thead className='my-2'>
                                <tr>
                                    <th scope="col">Organization Name</th>
                                    <th scope="col">Organization ID</th>
                                    <th scope="col">Members</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='my-2'>
                                {
                                    orgs.map(org => {
                                        return (
                                            <tr key={org.id}>
                                                <td>{org.name}</td>
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
            </section>
            
        </div>
    );
}

export default OrgAdminDashboard;