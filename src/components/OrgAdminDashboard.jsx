import React, { useState, useEffect } from 'react';
import OrgModal from './OrgModal.jsx';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useSharedState from '../hooks/useSharedState.js';
import { useNavigate } from 'react-router';
import ROLES from '../constants/roles.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import { DataGrid, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

const gradient_classes = ['gradient-1', 'gradient-2', 'gradient-3', 'gradient-4', 'gradient-5', 'gradient-6'];

const GET_ORGS_URL = '/api-org/getOrgs';
const GET_REQUESTS_URL = '/api-org/getRequests';
const JOIN_REQUEST_URL = '/api-org/joinOrg';
const REQUEST_APPROVE_URL = '/api-org/approveRequest';

const OrgAdminDashboard = () => {
    const { currentUser, dispatch } = useAuth();
    const { currentOrg, setState } = useSharedState();
    const navigate = useNavigate();

    const [errMsgOrg, setErrMsgOrg] = useState('');
    const [successOrg, setSuccessOrg] = useState(false);
    
    const [errMsgReq, setErrMsgReq] = useState('');
    const [successReq, setSuccessReq] = useState(false);

    const [errMsgJoin, setErrMsgJoin] = useState('');
    const [successJoin, setSuccessJoin] = useState(false);

    const [currentUserOrg, setCurrentUserOrg] = useState({});
    const [requestedOrgId, setRequestedOrgId] = useState('');

    const [orgs, setOrgs] = useState([]);
    const [requests, setRequests] = useState([]);

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

    const getRequests = async () => {
            
        try{
            // const response = await axios.post(GET_REQUESTS_URL,
            //     {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         withCredentials: true,
            //         payload: {
            //             adminEmail: currentUser?.user?.email
            //         }
            //     }
            // );
            // const successRes = response?.data?.success;
            // const reason = response?.data?.reason;
            // const requests = response?.data?.requests;

            // dummy data for testing
            const successRes = true;
            const reason = null;
            const requests = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'johndoe@email.com',
                    nic: '123456789V'
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'janesmith@email.com',
                    nic: '987654321M'
                },
                {
                    id: '3',
                    name: 'Bob Johnson',
                    email: 'bobjohnson@email.com',
                    nic: '456789123A'
                },
                {
                    id: '4',
                    name: 'Alice Brown',
                    email: 'alicebrown@email.com',
                    nic: '567890123B'
                },
                {
                    id: '5',
                    name: 'Charlie Davis',
                    email: 'charliedavis@email.com',
                    nic: '678901234C'
                },
                {
                    id: '6',
                    name: 'Eva White',
                    email: 'evawhite@email.com',
                    nic: '1122334455E'
                },
                {
                    id: '7',
                    name: 'Michael Black',
                    email: 'michaelblack@email.com',
                    nic: '9988776655M'
                },
                {
                    id: '8',
                    name: 'Olivia Green',
                    email: 'oliviagreen@email.com',
                    nic: '1122334455O'
                },
                {
                    id: '9',
                    name: 'David Gray',
                    email: 'davidgray@email.com',
                    nic: '9988776655D'
                },
                {
                    id: '10',
                    name: 'Sophia Red',
                    email: 'sophiared@email.com',
                    nic: '1122334455S'
                },
                {
                    id: '11',
                    name: 'Liam Yellow',
                    email: 'liamyellow@email.com',
                    nic: '9988776655L'
                },
                {
                    id: '12',
                    name: 'Ava Orange',
                    email: 'avaorange@email.com',
                    nic: '1122334455A'
                },
                {
                    id: '13',
                    name: 'Mason Pink',
                    email: 'masonpink@email.com',
                    nic: '9988776655P'
                },
                {
                    id: '14',
                    name: 'Emma Purple',
                    email: 'emmapurple@email.com',
                    nic: '1122334455Em'
                },
                {
                    id: '15',
                    name: 'Noah Brown',
                    email: 'noahbrown@email.com',
                    nic: '9988776655N'
                },
                {
                    id: '16',
                    name: 'Isabella Gray',
                    email: 'isabellagray@email.com',
                    nic: '1122334455I'
                },
                {
                    id: '17',
                    name: 'William White',
                    email: 'williamwhite@email.com',
                    nic: '9988776655W'
                },
                {
                    id: '18',
                    name: 'Sofia Black',
                    email: 'sofiablack@email.com',
                    nic: '1122334455So'
                },
                {
                    id: '19',
                    name: 'James Gold',
                    email: 'jamesgold@email.com',
                    nic: '9988776655J'
                },
                {
                    id: '20',
                    name: 'Emily Silver',
                    email: 'emilysilver@email.com',
                    nic: '1122334455E'
                }
            ];

            // check if requests is empty
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
                dispatch({ type: "LOGOUT" });
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
            const currUserOrg = orgs.find(org => org.id === orgID.toString());
            setCurrentUserOrg(currUserOrg);
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
        <div className='container-fluid org-admin-dashboard col-10 m-0 mx-auto p-0 position-relative'>
            <ToastContainer />
            <section className="admin-dashboard-title my-5">
                <h1 className='display-6 my-3'>{currentUserOrg?.name ? currentUserOrg?.name + " - Admin Dashboard" : "Admin Dashboard"}</h1>
                <div className={`card border-0 rounded shadow p-3 my-3 ${gradient_classes[Math.floor(Math.random() * 5) + 1]}`}>
                    <div className="card-body">
                        <h2 className='light fw-bold'>{currentUser?.user?.name}</h2>
                        <p className='light'>{currentUser?.user?.email} | {Object.keys(ROLES).find(key => ROLES[key] === currentUser?.user?.role)}</p>
                    </div>
                </div>
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
                        <button className="create-org btn btn-outline-dark col-10 mx-auto" onClick={(e) => navigate(`orgdash/${currentUserOrg?.id}`)} >View Organization</button>
                    </div>}
                </div>

                <div className="row my-3">
                    <div className="col-10 mx-auto text-center table-responsive">
                        {!errMsgOrg ? 
                            <Box sx={{ maxHeight: 400, width: '100%', overflowX: 'auto' }}>
                                <DataGrid
                                    rows={orgs}
                                    columns={[
                                        { field: 'id', headerName: 'Org ID', flex: 0.5, minWidth: 70 },
                                        { field: 'name', headerName: 'Org Name', flex: 1, minWidth: 140 },
                                        { field: 'email', headerName: 'Org Email', flex: 1, minWidth: 140 },
                                        { field: 'members', headerName: 'Members', flex: 0.5, minWidth: 70 },
                                        { field: 'actions', headerName: 'Actions', flex: 1, minWidth: 140, renderCell: (params) => {
                                            return (
                                                <>
                                                    <button className="btn btn-outline-dark mx-2" value={params.row.id} onClick={(e) => navigate(`/orgadmindash/orgdash/${params.row.id}`)}>View</button>
                                                    {currentUser?.user?.role !== ROLES.orgSuperAdmin && !successJoin ? <button className="btn btn-outline-dark mx-2" value={params.row.id} onClick={(e) => handleJoin(e)}>Join</button> : (requestedOrgId === params.row.id) ? <small className='text-muted fst-italic'>Request sent</small> :null}
                                                </>
                                            );
                                        }
                                         },
                                    ]}
                                    slots={{ toolbar: GridToolbar }}
                                    slotProps={{
                                        toolbar: {
                                          showQuickFilter: true,
                                        },
                                    }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: { page: 0, pageSize: 5 },
                                        },
                                        sorting: {
                                            sortModel: [{ field: 'actions', sortable: false }],
                                        }
                                    }}
                                    pageSizeOptions={[5, 10, 15, 20]}
                                />
                        </Box> : <span className='text-center my-5 text-danger'>{errMsgOrg}</span>}
                    </div>
                </div>
            </section>

            {currentUser?.user?.role === ROLES.orgSuperAdmin ? <>
                <section className="request-title-section">
                    <h1 className='display-6'>Requests</h1>
                </section>

                <section className="content">
                    <div className="row my-3">
                        <div className="col-10 mx-auto my-2 text-center table-responsive">
                            {!errMsgReq ? 
                                <Box sx={{ maxHeight: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={requests}
                                        columns={[
                                            { field: 'id', headerName: 'Req ID', flex: 0.5, minWidth: 70 },
                                            { field: 'name', headerName: 'Admin Name', flex: 1, minWidth: 140 },
                                            { field: 'email', headerName: 'Admin Email', flex: 1, minWidth: 140 },
                                            { field: 'nic', headerName: 'Admin NIC', flex: 1, minWidth: 140 },
                                            { field: 'actions', headerName: 'Actions', flex: 1.2, minWidth: 168, renderCell: (params) => {
                                                return (
                                                    <>
                                                        <button className="btn btn-outline-success mx-2" value={params.row.id} onClick={(e) => {navigate(`issuecert/${e.target.value}`)}}>Issue Certificate</button>
                                                    </>
                                                );
                                            }
                                             },
                                        ]}
                                        slots={{ toolbar: GridToolbar }}
                                        slotProps={{
                                            toolbar: {
                                              showQuickFilter: true,
                                            },
                                        }}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                            sorting: {
                                                sortModel: [{ field: 'actions', sortable: false }],
                                            }
                                        }}
                                        pageSizeOptions={[5, 10]}
                                    />
                              </Box>
                            : <span className='text-center my-5 text-danger'>{errMsgReq}</span>}
                        </div>
                    </div>
                </section>
            </> : null}
        </div>
    );
}

export default OrgAdminDashboard;