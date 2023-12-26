import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrgEvents } from "../features/organizations/eventSlice";
import { Card, CardBody, CardHeader, CardFooter, Typography, Button, Chip, Input } from "@material-tailwind/react";
import { ArrowRightIcon, CalendarIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { roles } from "../utils/constants";
import OrgDashboardDrawer from "../components/OrgDashboardDrawer";
import SortableTable from "../components/SortableTable";

const events_list = [
  { 
    eventID: 1,
    eventName: 'Structural Engineering Symposium',
    category: 'Civil Engineering',
    organization: 'TechMaster CPD Solutions',
    description: 'Join us for a comprehensive symposium on the latest advancements in structural engineering. Explore innovative design approaches and learn from industry experts.',
    date: '2023-02-15'
  },
  { 
    eventID: 2,
    eventName: 'Renewable Energy Workshop',
    category: 'Environmental Engineering',
    organization: 'InnovateLearn CPD',
    description: 'Discover the future of renewable energy solutions in this hands-on workshop. Gain insights into sustainable practices and cutting-edge technologies.',
    date: '2023-03-10'
  },
  { 
    eventID: 3,
    eventName: 'Software Engineering Summit',
    category: 'Software Engineering',
    organization: 'CodeMasters Professional Development',
    description: 'Stay ahead in the rapidly evolving field of software engineering. Engage with industry leaders, participate in coding challenges, and explore emerging technologies.',
    date: '2023-04-05'
  },
  { 
    eventID: 4,
    eventName: 'Mechanical Design Conference',
    category: 'Mechanical Engineering',
    organization: 'EngineerPro CPD',
    description: 'Enhance your knowledge of mechanical design principles and methodologies. Connect with fellow engineers, and gain insights into the latest trends in the industry.',
    date: '2023-05-20'
  },
  { 
    eventID: 5,
    eventName: 'Electrical Systems Forum',
    category: 'Electrical Engineering',
    organization: 'PowerTech CPD Academy',
    description: 'Participate in discussions on the future of electrical systems. Explore advancements in power generation, distribution, and smart grid technologies.',
    date: '2023-06-15'
  }
];

const members_tabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" }
]
const members_tab_colors = {
  'pending': 'amber',
  'approved': 'green',
  'rejected': 'red'
}
const members_table_head = [ "ID", "Date", "Name", "Email", "NIC", "Status" ];
const members_table_rows = [
  { id: 1, date: '2023-01-10', name: 'John Doe', email: 'john.doe@example.com', nic: '123456789', tab: 'approved' },
  { id: 2, date: '2023-02-05', name: 'Jane Smith', email: 'jane.smith@example.com', nic: '987654321', tab: 'pending' },
  { id: 3, date: '2023-03-20', name: 'Bob Johnson', email: 'bob.johnson@example.com', nic: '456789012', tab: 'rejected' },
  { id: 4, date: '2023-04-15', name: 'Alice Brown', email: 'alice.brown@example.com', nic: '345678901', tab: 'approved' },
  { id: 5, date: '2023-05-02', name: 'Charlie White', email: 'charlie.white@example.com', nic: '890123456', tab: 'pending' },
  { id: 6, date: '2023-06-08', name: 'Eva Davis', email: 'eva.davis@example.com', nic: '567890123', tab: 'approved' },
  { id: 7, date: '2023-07-19', name: 'Frank Johnson', email: 'frank.johnson@example.com', nic: '234567890', tab: 'pending' },
  { id: 8, date: '2023-08-25', name: 'Grace Miller', email: 'grace.miller@example.com', nic: '789012345', tab: 'rejected' },
  { id: 9, date: '2023-09-30', name: 'Harry Wilson', email: 'harry.wilson@example.com', nic: '678901234', tab: 'approved' },
  { id: 10, date: '2023-10-12', name: 'Ivy Taylor', email: 'ivy.taylor@example.com', nic: '901234567', tab: 'pending' },
  { id: 11, date: '2023-11-18', name: 'Jack Anderson', email: 'jack.anderson@example.com', nic: '789012345', tab: 'approved' },
  { id: 12, date: '2023-12-05', name: 'Karen Robinson', email: 'karen.robinson@example.com', nic: '345678901', tab: 'rejected' },
  { id: 13, date: '2024-01-22', name: 'Leo Garcia', email: 'leo.garcia@example.com', nic: '567890123', tab: 'approved' },
  { id: 14, date: '2024-02-08', name: 'Mia Foster', email: 'mia.foster@example.com', nic: '123456789', tab: 'pending' },
  { id: 15, date: '2024-03-14', name: 'Nathan Hall', email: 'nathan.hall@example.com', nic: '890123456', tab: 'approved' },
]

const OrgDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { user } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const { orgID } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currComponent, setCurrentComponent] = useState('dashboard');

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }
  
  const handleViewEvent = (eventID) => {  
    console.log(eventID);
    // navigate(EVENT_DASHBOARD_ROUTE.replace(":eventID", eventID));
  }

  const filteredEvents = events_list.filter((event) => {
    return event?.eventName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  useEffect(() => {
    dispatch(getOrgEvents(orgID));
  }, [orgID, dispatch]);
  
  useEffect(() => {
    console.log(events);
  }, [events]);
  
  return (
    <>
      <div className="md:container mx-auto md:px-16 py-8">
        <Button className="mb-4 flex" onClick={openDrawer}><Bars3Icon className="mr-2 w-4 h-4" />Main Menu</Button>
        {currComponent === 'dashboard' ? <>
          <Card className='org-details w-full'>
            <CardHeader floated={false} shadow={false} className='rounded-none'>
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant='h5' color='blue-gray'>
                    Organization Name
                  </Typography>
                  <Typography color='gray' className='mt-1 font-normal'>
                    Organization email
                  </Typography>
                  <Typography variant='paragraph' color='blue-gray' className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus voluptate nesciunt autem quidem pariatur nulla maiores, corrupti repudiandae fugiat officiis saepe deserunt minus labore quia quaerat. Qui deserunt doloremque quae harum accusamus molestias laudantium, id earum magnam minus repellat ducimus! Pariatur cumque temporibus autem praesentium ad eligendi maxime tempora reiciendis illum. Rerum ipsa numquam inventore officia quo deleniti voluptas iste amet necessitatibus cum itaque quae libero aperiam, eum sed tenetur aspernatur nihil laborum. Ipsam, nesciunt eligendi explicabo itaque reiciendis, temporibus, accusantium illum earum labore eaque voluptas recusandae quidem quas est unde delectus ut veritatis deleniti nostrum sit harum reprehenderit ducimus.
                  </Typography>
                  <Typography variant='paragraph' color='blue-gray'>
                    You can join this organization as an admin.
                  </Typography>
                  {(user?.role === roles.ORG_ADMIN) 
                    ? <Button className="mt-4" variant="outlined" size="md">Join Organization</Button>
                    : (user?.role === roles.ENG)
                      ? <Button className="mt-4" variant="outlined" size="md">Register Here</Button>
                      : null
                  }
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="mt-8">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant='h5' color='blue-gray'>
                  CPD Providers
                </Typography>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={searchTerm}
                    onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <section className="card-container mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              filteredEvents.map((event, index) => {
                return (
                  <Card key={index}>
                    <CardBody>
                      <div className="w-max">
                        <Chip className="mb-2" variant="ghost" color="amber" size="sm" value={event.category} />
                      </div>
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        {event.eventName}
                      </Typography>
                      <Typography className="line-clamp-2 md:line-clamp-3">
                        {event.description}
                      </Typography>
                      <Typography className="flex text-center mt-4 items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {event.date}
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <Button className="flex" value={event.eventID} onClick={e => handleViewEvent(e.target.value)}>
                        View Event
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            }
          </section>
        </> : null}

        {currComponent === 'events' ? <>
          <div className="mt-8">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant='h5' color='blue-gray'>
                  CPD Providers
                </Typography>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="w-full md:w-72">
                <Input
                    label="Search"
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    value={searchTerm}
                    onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <section className="card-container mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              filteredEvents.map((event, index) => {
                return (
                  <Card key={index}>
                    <CardBody>
                      <div className="w-max">
                        <Chip className="mb-2" variant="ghost" color="amber" size="sm" value={event.category} />
                      </div>
                      <Typography variant="h5" color="blue-gray" className="mb-2">
                        {event.eventName}
                      </Typography>
                      <Typography className="line-clamp-2 md:line-clamp-3">
                        {event.description}
                      </Typography>
                      <Typography className="flex text-center mt-4 items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {event.date}
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <Button className="flex" value={event.eventID} onClick={e => handleViewEvent(e.target.value)}>
                        View Event
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Button>
                    </CardFooter>
                  </Card>
                )
              })
            }
          </section>
        </> : null}

        {currComponent === 'members' ? <section className="members-details-section mt-8">
            <SortableTable
              table_head={members_table_head}
              table_rows={members_table_rows}
              tabs={members_tabs}
              tab_colors={members_tab_colors}
              title="Organization Members"
              description="See information about all registered/pending members"
            />
        </section> : null}

        {currComponent === 'settings' ? <section className="max-sm:px-4">
            <form>
              <Typography variant="h5">
                Organization Settings
              </Typography>
              <div className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="orgName" className="block text-sm font-medium leading-6 text-gray-900">Organization Name</label>
                  <div className="mt-2">
                    <input 
                      type="text"
                      name="orgName"
                      id="orgName"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="IESL"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={5}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about the organization.</p>
                </div>

                <div className="mt-6 flex items-center justify-start gap-x-4">
                  <Button className="text-gray-600" variant="text">
                    Cancel
                  </Button>
                  <Button>
                    Save
                  </Button>
                </div>
              </div>
            </form>
        </section> : null}

      </div>
      {/* show options only for relevant roles */}
      <OrgDashboardDrawer 
        drawerOpen={drawerOpen}
        closeDrawer={closeDrawer} 
        setCurrentComponent={setCurrentComponent}
      />
    </>
  )
}

export default OrgDashboard;