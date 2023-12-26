import { useState } from "react";
import { Card, CardHeader, Typography, Button, Chip } from "@material-tailwind/react";
import SortableTable from "../components/SortableTable";
import { ORG_DASHBOARD_ROUTE, EVENT_DASHBOARD_ROUTE } from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const org_tabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
]
const org_tab_colors = {
  'pending': 'amber',
  'approved': 'green',
  'rejected': 'red'
}
const org_table_head = [ "ID", "Organization Name", "Email", "# Members", "Status", "Action" ];
const org_table_rows = [
  { orgID: 1, orgName: 'Tech Innovators', email: 'info@techinnovators.com', members: 150, tab: 'approved' },
  { orgID: 2, orgName: 'GreenTech Solutions', email: 'contact@greentechsolutions.org', members: 80, tab: 'pending' },
  { orgID: 3, orgName: 'CodeCraft Academy', email: 'enroll@codecraftacademy.com', members: 200, tab: 'rejected' },
  { orgID: 4, orgName: 'Engineering Excellence', email: 'info@engineeringexcellence.org', members: 120, tab: 'approved' },
];

const event_tabs = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Upcoming", value: "upcoming" }
]
const event_tab_colors = {
  'completed': 'green',
  'upcoming': 'amber'
}
const event_table_head = [ "ID", "Event Name", "Date", "Time", "Status", "Action" ];
const event_table_rows = [
  { eventID: 1, eventName: 'Tech Summit 2023', date: '2023-07-15', time: '10:00 AM', tab: 'upcoming' },
  { eventID: 2, eventName: 'Innovation Workshop', date: '2023-05-20', time: '2:30 PM', tab: 'completed' },
  { eventID: 3, eventName: 'Data Science Conference', date: '2023-08-30', time: '9:00 AM', tab: 'upcoming' },
  { eventID: 4, eventName: 'AI Hackathon', date: '2023-06-10', time: '1:00 PM', tab: 'upcoming' },
  { eventID: 5, eventName: 'Web Development Seminar', date: '2023-04-25', time: '3:45 PM', tab: 'completed' },
];

const EngDashboard = () => {

  const navigate = useNavigate();

  const [selectedEvents, setSelectedEvents] = useState([]);

  const handleViewOrg = (row) => {
    navigate(ORG_DASHBOARD_ROUTE.replace(':orgID', row.orgID));
  }
  
  const handleViewEvent = (row) => {
    navigate(EVENT_DASHBOARD_ROUTE.replace(':eventID', row.eventID));
  }

  const handleIssueCertificate = () => {
    if (selectedEvents.some(event => event.tab !== 'completed')) {
      toast.error("You can only issue certificates for completed events.");
      return;
    }
    console.log("issue a certificate for these events: ", selectedEvents);
  }

  return (
    <div className="md:container mx-auto md:px-16 py-8">
      <section className="user-details-section w-full">
          <Card className='user-details sm:w-1/2'>
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
                    <Chip className="mt-2" variant="gradient" color="amber" value="Engineer" />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        <section className="joined-org-details mt-8">
          <SortableTable 
            table_head={org_table_head}
            table_rows={org_table_rows}
            tabs={org_tabs}
            tab_colors={org_tab_colors}
            title="Requested Organization Details"
            description="You can view the details of the organizations you have requested to join."
            actions={[{handler: handleViewOrg, tooltip: "View Organization"}]}
          />
        </section>

        <section className="issue-certificate-section w-full mt-8">
          <Card className='issue-certificate'>
            <CardHeader floated={false} shadow={false} className='rounded-none'>
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant='h5' color='blue-gray'>
                    Issue Certificate
                  </Typography>
                  <Typography color='gray' className='mt-1 font-normal'>
                    Select the events you want to from the registered event details section to issue a certificate.
                  </Typography>
                  <Button className="mt-4" disabled={selectedEvents.length === 0 ? true : false} onClick={handleIssueCertificate}>Issue Certificate</Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>
        
        <section className="registered-event-details mt-8">
          <SortableTable 
            table_head={event_table_head}
            table_rows={event_table_rows}
            tabs={event_tabs}
            tab_colors={event_tab_colors}
            title="Registered Event Details"
            description="You can view the details of the events you have registered for."
            actions={[{handler: handleViewEvent, tooltip: "View Event"}]}
            selectable={true}
            getSelectedRows={setSelectedEvents}
          />
        </section>
    </div>
  )
}

export default EngDashboard