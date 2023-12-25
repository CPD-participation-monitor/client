import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import SortableTable from "../components/SortableTable";
import CreateNewOrgDialog from "../components/CreateNewOrgDialog";
import { Card, CardHeader, Typography, Button, Chip } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Spinner from "../components/Spinner";
import { reset, getAllOrganizations } from "../features/organizations/orgSlice";
import { ORG_DASHBOARD_ROUTE } from "../utils/routes";

const req_tabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
]
const tab_colors = {
  'pending': 'amber',
  'approved': 'green',
  'rejected': 'red'
}

const org_table_head = [ "ID", "Organization Name", "Email", "# Members", "" ];

const req_table_head = [ "ID", "Administrator Name", "Email", "NIC", "Status", "" ];
const req_table_rows = [
  { id: '1', name: 'John Doe', email: 'johndoe@email.com', nic: '123456789V', tab: 'pending' },
  { id: '2', name: 'Jane Smith', email: 'janesmith@email.com', nic: '987654321V', tab: 'approved' },
  { id: '3', name: 'Bob Johnson', email: 'bobjohnson@email.com', nic: '456789012V', tab: 'rejected' },
  { id: '4', name: 'Alice Williams', email: 'alicewilliams@email.com', nic: '345678901V', tab: 'pending' },
  { id: '5', name: 'Charlie Brown', email: 'charliebrown@email.com', nic: '567890123V', tab: 'approved' },
  { id: '6', name: 'Eva Davis', email: 'evadavis@email.com', nic: '789012345V', tab: 'rejected' },
  { id: '7', name: 'David Lee', email: 'davidlee@email.com', nic: '890123456V', tab: 'pending' },
  { id: '8', name: 'Grace Miller', email: 'gracemiller@email.com', nic: '234567890V', tab: 'approved' },
  { id: '9', name: 'Henry Wilson', email: 'henrywilson@email.com', nic: '678901234V', tab: 'rejected' },
  { id: '10', name: 'Ivy Harris', email: 'ivyharris@email.com', nic: '901234567V', tab: 'pending' },
  { id: '11', name: 'Frank Rodriguez', email: 'frankrodriguez@email.com', nic: '012345678V', tab: 'approved' },
  { id: '12', name: 'Gina Martinez', email: 'ginamartinez@email.com', nic: '345678901V', tab: 'rejected' },
];

const OrgAdminDashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openNewOrganization, setOpenNewOrganization] = useState(false);

	const { organizations, isLoading, isErrored, isSuccess, errorMessage } = useSelector((state) => state.org);

	useEffect(() => {
		dispatch(getAllOrganizations());
	}, [dispatch]);

	useEffect(() => {
		if (isErrored) errorToast(errorMessage);
		if (isSuccess) successToast("Organizations fetched successfully");
		dispatch(reset());
	}, [organizations, isErrored, isSuccess, errorMessage, dispatch]);

  const handleOpen = () => { setOpenNewOrganization((cur) => !cur); };

  const handleViewOrg = (row) => {
    navigate(ORG_DASHBOARD_ROUTE.replace(':orgID', row.orgID));
  }

  return (
    <>
      <div className="md:container mx-auto md:px-16 py-8">
        {/* web view */}
        <section className="intro hidden md:flex gap-x-8">
          <Card className='user-details w-full'>
            <CardHeader floated={false} shadow={false} className='rounded-none'>
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant='h5' color='blue-gray'>
                    Welcome, User
                  </Typography>
                  <Typography color='gray' className='mt-1 font-normal'>
                    user email
                  </Typography>
                  <div className="w-max">
                    <Chip className="mt-2" variant="gradient" color="amber" value="Administrator" />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          
          <Card className='user-actions w-full'>
            <CardHeader floated={false} shadow={false} className='rounded-none'>
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant='paragraph' color='blue-gray'>
                    You can create a new organization and be a super admin, or join an existing organization as an admin.
                  </Typography>
                  <Button className="mt-4 flex" variant="outlined" size="md" onClick={handleOpen}>New Organization <PlusIcon className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* mobile view */}
        <Card className='user-details w-full md:hidden'>
          <CardHeader floated={false} shadow={false} className='rounded-none'>
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant='h5' color='blue-gray'>
                  Welcome, User
                </Typography>
                <Typography color='gray' className='mt-1 font-normal'>
                  user email
                </Typography>
                <div className="w-max">
                  <Chip className="mt-2" variant="gradient" color="amber" value="Administrator" />
                </div>
                <Typography variant='paragraph' color='blue-gray'>
                  You can create a new organization and be a super admin, or join an existing organization as an admin.
                </Typography>
                <Button className="mt-4" variant="outlined" size="md" onClick={handleOpen}>New Organization <PlusIcon className="w-4 h-4 ml-2" /></Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        <section className="org-details mt-8">
          {isLoading ? <Spinner /> : 
          <SortableTable
          table_head={org_table_head}
            /* eslint-disable-next-line no-unused-vars */
            table_rows={organizations.map(({ description, ...rest }) => rest)}
            title="Organizations List"
            description="See information about all registered organizations"
            actionHandler={handleViewOrg}
          />}
        </section>
        
        <section className="join-request-details mt-8">
          <SortableTable
            table_head={req_table_head}
            table_rows={req_table_rows}
            tabs={req_tabs}
            tab_colors={tab_colors}
            title="Admin Requests List"
            description="Accept or reject admin requests to join an organization"
          />
        </section>
      </div>
      <CreateNewOrgDialog openState={openNewOrganization} handleOpen={handleOpen} />
    </>
  )
}

export default OrgAdminDashboard;