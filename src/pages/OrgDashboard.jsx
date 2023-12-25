import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrgEvents } from "../features/organizations/eventSlice";
import { Card, CardBody, CardHeader, CardFooter, Typography, Button, Chip, Input } from "@material-tailwind/react";
import { ArrowRightIcon, CalendarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const OrgDashboard = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  
  const dispatch = useDispatch();
  
  const { orgID } = useParams();
  useEffect(() => {
    console.log(orgID);
  }, []);
  
  useEffect(() => {
    dispatch(getOrgEvents(orgID));
  }, [orgID, dispatch]);
  
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
  
  const { events } = useSelector((state) => state.event);
  
  const filteredEvents = events_list.filter((event) => {
    return event?.eventName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  useEffect(() => {
    console.log(events);
  }, [events]);


  return (
    <div className="md:container mx-auto md:px-16 py-8">
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
              {/* should be displayed only to admins who are not joined to an organization */}
              <Button className="mt-4" variant="outlined" size="md">Join Organization</Button>
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
                  <Button className="flex" value={event.eventID} onClick={e => handleReadMore(e.target.value)}>
                    View Event
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })
        }
      </section>
    </div>
  )
}

export default OrgDashboard