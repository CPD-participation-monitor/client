import React from 'react';
import axios from '../api/axios';

const CREATE_ORG_URL = '/createOrganization';

const OrgAdminDashboard = () => {

    const handleSubmitOrg = async (e) => {
        e.preventDefault();

        console.log('Create Organization');
        
        try{
            const payload = {
                orgName: 'Organization 1'
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
            // if (!err?.response){
            //     setErrMsg('No Server Response');
            // }
            // else if (err.response?.status === 400){
            //     setErrMsg('Missing Username or Password');
            // }
            // else if (err.response?.status === 401){
            //     setErrMsg('Unauthorized');
            // }
            // else{
            //     setErrMsg('Login Failed');
            // }
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
                        <button className="create-org btn btn-outline-dark" onClick={handleSubmitOrg}>Create Organization</button>
                    </div>
                    <div className='col-12 col-md-6 d-flex flex-row'>
                        <div className="search-bar col-10 col-lg-6 mx-2">
                            <input type="text" name="search" id="search" className="form-control form-input" placeholder='Type here...' />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-10 mx-auto">
                        <table className='col-12 my-5 table table-striped table-hover'>
                            <thead className='my-2'>
                                <tr>
                                    <th scope="col">Organization Name</th>
                                    <th scope="col">Organization ID</th>
                                    <th scope="col">Members</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className='my-2'>
                                <tr>
                                    <td>Organization 1</td>
                                    <td>123456</td>
                                    <td>10</td>
                                    <td>
                                        <button className="btn btn-outline-dark">Join</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Organization 2</td>
                                    <td>654321</td>
                                    <td>5</td>
                                    <td>
                                        <button className="btn btn-outline-dark">Join</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Organization 3</td>
                                    <td>987654</td>
                                    <td>2</td>
                                    <td>
                                        <button className="btn btn-outline-dark">Join</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            
        </div>
    );
}

export default OrgAdminDashboard;