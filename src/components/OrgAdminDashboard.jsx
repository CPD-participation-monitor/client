import React from 'react';
import OrgModal from './OrgModal.jsx';

const OrgAdminDashboard = () => {

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