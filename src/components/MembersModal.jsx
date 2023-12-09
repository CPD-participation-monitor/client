import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';

const MembersModal = () => {

    const [members, setMembers] = useState([]);
    const [pendingMembers, setPendingMembers] = useState([]);
    const [errMembers, setErrMembers] = useState(false);
    const [errPendingMembers, setErrPendingMembers] = useState(false);

    useEffect(() => {
        console.log("fetched members");
        const memArr = [
            {
                id: 1,
                name: "John Doe",
                email: "john.doe@email.com",
                phone: "123-456-7890",
                address: "123 Main St, City, State 12345",
                birthday: "01/01/2000",
                nic: "1234567890",
                industry: "Software Engineering",
            },
            {
                id: 2,
                name: "Jane Smith",
                email: "jane.smith@email.com",
                phone: "987-654-3210",
                address: "456 Oak St, Town, State 56789",
                birthday: "02/15/1995",
                nic: "9876543210",
                industry: "Electrical Engineering",
            },
            {
                id: 3,
                name: "Bob Johnson",
                email: "bob.johnson@email.com",
                phone: "555-555-5555",
                address: "789 Pine St, Village, State 98765",
                birthday: "05/20/1988",
                nic: "3456789012",
                industry: "Mechanical Engineering",
            },
            {
                id: 4,
                name: "Alice Brown",
                email: "alice.brown@email.com",
                phone: "111-222-3333",
                address: "567 Elm St, Hamlet, State 34567",
                birthday: "11/11/1992",
                nic: "6789012345",
                industry: "Civil Engineering",
            },
            {
                id: 5,
                name: "Charlie Davis",
                email: "charlie.davis@email.com",
                phone: "444-444-4444",
                address: "890 Maple St, Borough, State 76543",
                birthday: "08/08/1985",
                nic: "5432109876",
                industry: "Chemical Engineering",
            },
            {
                id: 6,
                name: "Eva White",
                email: "eva.white@email.com",
                phone: "666-777-8888",
                address: "234 Birch St, County, State 23456",
                birthday: "04/02/1999",
                nic: "1029384756",
                industry: "Biomedical Engineering",
            },
            {
                id: 7,
                name: "Michael Black",
                email: "michael.black@email.com",
                phone: "777-888-9999",
                address: "789 Cedar St, District, State 87654",
                birthday: "12/25/1980",
                nic: "5678901234",
                industry: "Aerospace Engineering",
            },
            {
                id: 8,
                name: "Olivia Green",
                email: "olivia.green@email.com",
                phone: "333-333-3333",
                address: "345 Poplar St, Province, State 54321",
                birthday: "09/30/1990",
                nic: "9876543219",
                industry: "Environmental Engineering",
            },
            {
                id: 9,
                name: "David Gray",
                email: "david.gray@email.com",
                phone: "888-999-0000",
                address: "456 Willow St, Territory, State 32109",
                birthday: "06/15/1983",
                nic: "2345678901",
                industry: "Industrial Engineering",
            },
            {
                id: 10,
                name: "Sofia Red",
                email: "sofia.red@email.com",
                phone: "555-666-7777",
                address: "678 Walnut St, Region, State 10987",
                birthday: "03/05/1996",
                nic: "5432109871",
                industry: "Materials Engineering",
            },
            {
                id: 11,
                name: "Liam Yellow",
                email: "liam.yellow@email.com",
                phone: "111-222-3333",
                address: "789 Oak St, Metropolis, State 76543",
                birthday: "07/07/1991",
                nic: "8765432109",
                industry: "Computer Engineering",
            },
            {
                id: 12,
                name: "Ava Orange",
                email: "ava.orange@email.com",
                phone: "222-333-4444",
                address: "890 Pine St, Gotham, State 87654",
                birthday: "10/10/1987",
                nic: "1230987654",
                industry: "Nuclear Engineering",
            },
            {
                id: 13,
                name: "Mason Pink",
                email: "mason.pink@email.com",
                phone: "333-444-5555",
                address: "234 Elm St, Atlantis, State 23456",
                birthday: "06/01/1998",
                nic: "5432109876",
                industry: "Telecommunications Engineering",
            },
            {
                id: 14,
                name: "Emma Purple",
                email: "emma.purple@email.com",
                phone: "444-555-6666",
                address: "567 Maple St, Wakanda, State 34567",
                birthday: "12/12/1994",
                nic: "6789012345",
                industry: "Biomechanical Engineering",
            },
            {
                id: 15,
                name: "Noah Brown",
                email: "noah.brown@email.com",
                phone: "555-666-7777",
                address: "678 Cedar St, Zion, State 12345",
                birthday: "03/15/1997",
                nic: "0987654321",
                industry: "Robotics Engineering",
            },
            {
                id: 16,
                name: "Isabella Gray",
                email: "isabella.gray@email.com",
                phone: "666-777-8888",
                address: "890 Birch St, Asgard, State 67890",
                birthday: "09/20/1989",
                nic: "1234509876",
                industry: "Renewable Energy Engineering",
            },
            {
                id: 17,
                name: "William White",
                email: "william.white@email.com",
                phone: "777-888-9999",
                address: "123 Poplar St, Rivendell, State 54321",
                birthday: "05/25/1992",
                nic: "6789012345",
                industry: "Petroleum Engineering",
            },
            {
                id: 18,
                name: "Sofia Black",
                email: "sofia.black@email.com",
                phone: "888-999-0000",
                address: "456 Willow St, Hogwarts, State 32109",
                birthday: "11/30/1984",
                nic: "2345678901",
                industry: "Systems Engineering",
            },
            {
                id: 19,
                name: "James Gold",
                email: "james.gold@email.com",
                phone: "999-000-1111",
                address: "567 Chestnut St, Wonderland, State 10987",
                birthday: "04/18/1993",
                nic: "3456789012",
                industry: "Automotive Engineering",
            },
            {
                id: 20,
                name: "Emily Silver",
                email: "emily.silver@email.com",
                phone: "000-111-2222",
                address: "678 Cedar St, Neverland, State 98765",
                birthday: "08/05/1986",
                nic: "5678901234",
                industry: "Environmental Engineering",
            }
        ];
        if (memArr.length === 0) {
            setErrMembers("No members found");
        }
        setMembers(memArr);
        setPendingMembers(memArr);
    }, []);

    const handleRequest = (e) => {
        console.log(e.target.value);
    }

    return (
        <div className="modal fade" id="members-modal" tabIndex="-1" aria-hidden="true" aria-labelledby="members-modal">
            <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Member Info</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row my-3 mx-2">
                            <h5 className="display-6 my-3">Registered Members</h5>
                            {!errMembers ? 
                            <Box  sx={{ maxHeight: 400, width: '100%' }}>
                                <DataGrid
                                    rows={members}
                                    columns={[
                                        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
                                        { field: 'name', headerName: 'Full Name', flex: 1, minWidth: 140 },
                                        { field: 'email', headerName: 'Email', flex: 1, minWidth: 140 },
                                        { field: 'phone', headerName: 'Contact Info', flex: 1, minWidth: 140 },
                                        { field: 'address', headerName: 'Address', flex: 1, minWidth: 140 },
                                        { field: 'birthday', headerName: 'DoB', flex: 1, minWidth: 140 },
                                        { field: 'nic', headerName: 'NIC', flex: 1, minWidth: 140 },
                                        { field: 'industry', headerName: 'Industry', flex: 1, minWidth: 140 },
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
                                    pageSizeOptions={[5, 10, 15, 20]}
                                />
                            </Box> : <span className='text-center my-5 text-danger'>{errMembers}</span>}
                        </div>

                        <div className="row my-3 mx-2">
                            <h5 className="display-6 my-3">Pending Members</h5>
                            {!errMembers ? 
                            <Box  sx={{ maxHeight: 400, width: '100%' }}>
                                <DataGrid
                                    rows={pendingMembers}
                                    columns={[
                                        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
                                        { field: 'name', headerName: 'Full Name', flex: 1, minWidth: 140 },
                                        { field: 'email', headerName: 'Email', flex: 1, minWidth: 140 },
                                        { field: 'phone', headerName: 'Contact Info', flex: 1, minWidth: 140 },
                                        { field: 'address', headerName: 'Address', flex: 1, minWidth: 140 },
                                        { field: 'birthday', headerName: 'DoB', flex: 1, minWidth: 140 },
                                        { field: 'nic', headerName: 'NIC', flex: 1, minWidth: 140 },
                                        { field: 'industry', headerName: 'Industry', flex: 1, minWidth: 140 },
                                        { field: 'actions', headerName: 'Actions', flex: 1.2, minWidth: 168, renderCell: (params) => {
                                            return (
                                                <>
                                                    <button className="btn btn-outline-success mx-2" value={{requestId: params.row.id, approve: true}} onClick={(e) => handleRequest(e)}>Approve</button>
                                                    <button className="btn btn-outline-danger mx-2" value={{requestId: params.row.id, approve: false}} onClick={(e) => handleRequest(e)}>Reject</button>
                                                </>
                                            );
                                        }
                                        }
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
                                    pageSizeOptions={[5, 10, 15, 20]}
                                />
                            </Box> : <span className='text-center my-5 text-danger'>{errMembers}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default MembersModal;