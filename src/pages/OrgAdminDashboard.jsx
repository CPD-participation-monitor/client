import SortableTable from "../components/SortableTable"
import { Card, CardHeader, Typography, Button, Chip } from "@material-tailwind/react"

const OrgAdminDashboard = () => {

  // const tabs = [
  //   { label: "All", value: "all" },
  //   { label: "Pending", value: "pending" },
  //   { label: "Approved", value: "approved" },
  //   { label: "Rejected", value: "rejected" }
  // ]

  const table_head = [ "ID", "Organization Name", "Email", "# Members", "" ];

  const table_rows = [
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

  return (
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
                <Button className="mt-4" variant="outlined" size="md">New Organization +</Button>
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
          table_head={table_head}
          table_rows={table_rows}
        />
      </section>
    </div>
  )
}

export default OrgAdminDashboard