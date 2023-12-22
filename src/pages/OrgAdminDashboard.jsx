import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorToast, successToast } from "../utils/toasts";
import SortableTable from "../components/SortableTable";
import CreateNewOrgDialog from "../components/CreateNewOrgDialog";
import { Card, CardHeader, Typography, Button, Chip } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Spinner from "../components/Spinner";
import { reset } from "../features/organizations/orgSlice";

const OrgAdminDashboard = () => {

  const [openNewOrganization, setOpenNewOrganization] = useState(false);
  const handleOpen = () => { setOpenNewOrganization((cur) => !cur); };

  // should have requests to get these data from the backend===============================================
  // ======================================================================================================
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
  const org_table_rows = [
    {
      id: 1,
      organizationName: 'Professional Learning Institute',
      email: 'info@pli.org',
      members: 300,
    },
    {
      id: 2,
      organizationName: 'Advanced Skills Academy',
      email: 'contact@asa.edu',
      members: 500,
    },
    {
      id: 3,
      organizationName: 'Tech Professionals Hub',
      email: 'info@tph.org',
      members: 200,
    },
    {
      id: 4,
      organizationName: 'Healthcare Training Solutions',
      email: 'info@hts.org',
      members: 700,
    },
    {
      id: 5,
      organizationName: 'Education Professionals Network',
      email: 'contact@epn.edu',
      members: 400,
    },
  ]

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
  // ========================================================================================================
  // ========================================================================================================

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
                  <Chip className="mt-2" variant="gradient" color="amber" value="Administrator" />
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
                <Typography variant='paragraph' color='blue-gray'>
                  You can create a new organization and be a super admin, or join an existing organization as an admin.
                </Typography>
                <Button className="mt-4" variant="outlined" size="md">New Organization +</Button>
              </div>
            </div>
          </CardHeader>
        </Card>
        <section className="org-details mt-8">
          <SortableTable
            table_head={org_table_head}
            table_rows={org_table_rows}
            title="Organizations List"
            description="See information about all registered organizations"
          />
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