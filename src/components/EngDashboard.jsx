import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// styles
import Box from '@mui/material/Box';
import { DataGrid, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';

const EngDashboard = () => {

    const navigate = useNavigate();
    const [selectedEventIds, setSelectedEventIds] = useState([]);

    const handleSelectedEvents = (selectionModel) => {
        setSelectedEventIds(selectionModel);
    }

    const handleIssueCertificate = async () => {
        console.log(selectedEventIds);
    }

    return (
        <div className='container-fluid eng-dashboard col-10 m-0 mx-auto p-0 position-relative'>
            <section className="eng-dashboard-title my-5">
                <h1 className='display-6 my-3'>Engineer Dashboard</h1>
                <div className="card border-0 rounded shadow p-3 my-3">
                    <div className="card-body">
                        <h2 className='light fw-bold'>Engineer Name</h2>
                        <p className='light'>randomeng@email.com | Engineer</p>
                    </div>
                </div>
            </section>

            <section className="org-details content">
                <div className="row my-3">
                    <h1 className="my-3 fs-3">Registered Organizations</h1>

                    <div className="col-12 mx-auto my-2 text-center table-responsive">
                        <Box sx={{ maxHeight: 400, width: '100%' }}>
                            <DataGrid
                                rows={[
                                    { id: 1, orgName: 'ABC Corp', orgEmail: 'abc@example.com', status: 'pending' },
                                    { id: 2, orgName: 'XYZ Ltd', orgEmail: 'xyz@example.com', status: 'approved' },
                                    { id: 3, orgName: 'Tech Solutions', orgEmail: 'tech@example.com', status: 'pending' },
                                    { id: 4, orgName: 'Global Innovations', orgEmail: 'global@example.com', status: 'approved' },
                                    { id: 5, orgName: 'Future Enterprises', orgEmail: 'future@example.com', status: 'pending' },
                                ]}
                                columns={[
                                    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
                                    { field: 'orgName', headerName: 'Organization Name', flex: 1, minWidth: 200 },
                                    { field: 'orgEmail', headerName: 'Organization Email', flex: 1, minWidth: 200 },
                                    { field: 'status', headerName: 'Status', flex: 1, minWidth: 200, renderCell: (params) => {
                                        const { value } = params;
                                        const style = {
                                            fontStyle: 'italic',
                                            color: value === 'pending' ? 'grey' : 'green',
                                        }
                                        return <div style={style}>{value}</div>;
                                    }},
                                    { field: 'action', headerName: 'Action', flex: 0.5, minWidth: 150, sortable: false, renderCell: (params) => {
                                        return (
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-outline-dark mx-2" onClick={(e) => navigate(`orgdash/${params.row.id}`)}>View</button>
                                            </div>
                                        )
                                    }},
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
                                    }
                                }}
                                pageSizeOptions={[5, 10]}
                            />
                        </Box>
                    </div>
                </div>
            </section>

            <section className="event-details content">
                <div className="row my-3">
                    <h1 className="my-3 fs-3">Registered Events</h1>

                    <div className="col-12 col-sm-4 col-md-3 my-3 mt-5">
                        {/* disable the button if selectedEventIds is empty */}
                        <button className={`btn btn-outline-dark col-12 ${selectedEventIds.length === 0 ? "disabled" : ""}`} onClick={handleIssueCertificate}>Issue Certificate</button>
                    </div>

                    <div className="col-12 mx-auto my-2 text-center table-responsive">
                        <Box sx={{ maxHeight: 400, width: '100%' }}>
                            <DataGrid
                                rows={[
                                    { id: 1, orgName: 'ABC Corp', event: 'Product Launch', status: 'completed' },
                                    { id: 2, orgName: 'XYZ Ltd', event: 'Team Building Retreat', status: 'pending' },
                                    { id: 3, orgName: 'Tech Solutions', event: 'Hackathon', status: 'completed' },
                                    { id: 4, orgName: 'Global Innovations', event: 'Conference', status: 'pending' },
                                    { id: 5, orgName: 'Future Enterprises', event: 'Workshop', status: 'completed' },
                                ]}
                                columns={[
                                    { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
                                    { field: 'orgName', headerName: 'Organization Name', flex: 1, minWidth: 200 },
                                    { field: 'event', headerName: 'Event Name', flex: 1, minWidth: 200 },
                                    { field: 'status', headerName: 'Event Status', flex: 1, minWidth: 200, renderCell: (params) => {
                                        const { value } = params;
                                        const style = {
                                            fontStyle: 'italic',
                                            color: value === 'pending' ? 'grey' : 'green',
                                        }
                                        return <div style={style}>{value}</div>;
                                    }},
                                    { field: 'action', headerName: 'Action', flex: 0.5, minWidth: 150, sortable: false, renderCell: (params) => {
                                        return (
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-outline-dark mx-2" onClick={(e) => navigate(`eventdash/${params.row.eventID}`)}>View</button>
                                            </div>
                                        )
                                    }},
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
                                    }
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                onRowSelectionModelChange={handleSelectedEvents}
                            />
                        </Box>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EngDashboard;