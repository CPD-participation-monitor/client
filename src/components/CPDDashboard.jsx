import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const CPDDashboard = () => {

    const GET_ALL_ORGS = '/api/organisations';

    const navigate = useNavigate();
    // const [type, setType] = useState('provider');
    const [orgs, setOrgs] = useState([]);
    // const [events, setEvents] = useState([]);
    const [orgSearchTerm, setOrgSearchTerm] = useState('');
    // const [eventSearchTerm, setEventSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const getLastUpdated = (timestampString) => {
        const timestamp = new Date(timestampString);
        const now = new Date();

        const diff = now - timestamp;

        // Calculate days and remaining minutes
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const minutes = Math.floor(diff / (1000 * 60)) % 60;

        return `Last updated ${days ? days + ' days and ' : ''}${minutes} minutes ago.`;
    }

    const orgArr = [
        {
            id: 1,
            name: "EngineerTech Academy",
            description: "A leading engineering academy providing high-quality Continuing Professional Development (CPD) courses for engineers.",
            logo: "engineertech_logo.png",
            lastUpdated: "2023-12-01 09:45:00"
        },
        {
            id: 2,
            name: "InnovateEngineering Solutions",
            description: "Innovate your engineering skills with our cutting-edge CPD programs. Stay ahead in the rapidly evolving field of engineering.",
            logo: "innovateengineering_logo.jpg",
            lastUpdated: "2023-11-28 15:20:00"
        },
        {
            id: 3,
            name: "Global Engineers Network",
            description: "Connecting global engineers through comprehensive CPD initiatives. Enhance your expertise and expand your professional network.",
            logo: "global_engineers_logo.png",
            lastUpdated: "2023-11-25 12:10:00"
        },
        {
            id: 4,
            name: "TechPro Development Hub",
            description: "Empowering engineers through advanced CPD courses. TechPro is your partner in continuous learning and professional growth.",
            logo: "techpro_logo.png",
            lastUpdated: "2023-12-02 18:55:00"
        },
        {
            id: 5,
            name: "Innovative Engineering Academy",
            description: "Dedicated to fostering innovation in engineering. Our CPD programs equip engineers with the skills needed for the future.",
            logo: "innovative_engineering_logo.jpg",
            lastUpdated: "2023-12-03 14:30:00"
        },
        {
            id: 6,
            name: "FutureTech Engineers Institute",
            description: "Shaping the future of technology through continuous professional development. Join us on the journey of innovation.",
            logo: "futuretech_engineers_logo.png",
            lastUpdated: "2023-11-27 10:05:00"
        },
        {
            id: 7,
            name: "NexGen Engineering Solutions",
            description: "Next-generation engineering solutions and CPD programs. Elevate your engineering skills with NexGen.",
            logo: "nexgen_engineering_logo.jpg",
            lastUpdated: "2023-11-30 16:40:00"
        },
        {
            id: 8,
            name: "Evolve Engineers Institute",
            description: "Evolve your engineering expertise through our comprehensive CPD courses. Stay at the forefront of the engineering industry.",
            logo: "evolve_engineers_logo.png",
            lastUpdated: "2023-12-04 11:25:00"
        },
        {
            id: 9,
            name: "Synthetic Tech Academy",
            description: "Synthetic Technologies for the modern engineer. CPD programs designed to meet the challenges of a rapidly changing technological landscape.",
            logo: "synthetic_tech_academy_logo.jpg",
            lastUpdated: "2023-11-29 08:15:00"
        },
        {
            id: 10,
            name: "InnoSphere Engineering Institute",
            description: "Innovate within the sphere of engineering. Join us for cutting-edge CPD programs that drive professional excellence.",
            logo: "innosphere_engineering_logo.png",
            lastUpdated: "2023-12-01 20:50:00"
        }
    ]

    // just filter by name for now
    const filteredOrgs = orgs.filter((org) => {
        return org.name.toLowerCase().includes(orgSearchTerm.toLowerCase());
    });

    // const eventArr = [
    //     {
    //         id: 1,
    //         name: "Engineering Summit 2023",
    //         provider: "EngineerTech Academy",
    //         description: "Join us at the Engineering Summit 2023 for insightful sessions and workshops. Explore the latest trends and advancements in engineering.",
    //         lastUpdated: "2023-12-01 09:45:00"
    //     },
    //     {
    //         id: 2,
    //         name: "InnovateEngineering Conference",
    //         provider: "InnovateEngineering Solutions",
    //         description: "The InnovateEngineering Conference is your opportunity to engage with leading experts and discover innovative solutions in engineering.",
    //         lastUpdated: "2023-11-28 15:20:00"
    //     },
    //     {
    //         id: 3,
    //         name: "Global Engineers Forum",
    //         provider: "Global Engineers Network",
    //         description: "Connect with engineers from around the world at the Global Engineers Forum. A platform for knowledge exchange and networking.",
    //         lastUpdated: "2023-11-25 12:10:00"
    //     },
    //     {
    //         id: 4,
    //         name: "TechPro Development Symposium",
    //         provider: "TechPro Development Hub",
    //         description: "TechPro Development Symposium offers a comprehensive exploration of the latest developments and skills in engineering.",
    //         lastUpdated: "2023-12-02 18:55:00"
    //     },
    //     {
    //         id: 5,
    //         name: "Innovative Engineering Expo",
    //         provider: "Innovative Engineering Academy",
    //         description: "Experience the future of engineering at the Innovative Engineering Expo. Discover groundbreaking technologies and projects.",
    //         lastUpdated: "2023-12-03 14:30:00"
    //     },
    //     {
    //         id: 6,
    //         name: "FutureTech Engineers Convention",
    //         provider: "FutureTech Engineers Institute",
    //         description: "The FutureTech Engineers Convention is a convergence of engineering minds. Explore the possibilities of future technologies.",
    //         lastUpdated: "2023-11-27 10:05:00"
    //     },
    //     {
    //         id: 7,
    //         name: "NexGen Engineering Summit",
    //         provider: "NexGen Engineering Solutions",
    //         description: "NexGen Engineering Summit brings together experts to discuss the next generation of engineering solutions and practices.",
    //         lastUpdated: "2023-11-30 16:40:00"
    //     },
    //     {
    //         id: 8,
    //         name: "Evolve Engineers Conference",
    //         provider: "Evolve Engineers Institute",
    //         description: "Evolve Engineers Conference focuses on the evolution of engineering. Attend insightful sessions on the industry's future.",
    //         lastUpdated: "2023-12-04 11:25:00"
    //     },
    //     {
    //         id: 9,
    //         name: "Synthetic Tech Symposium",
    //         provider: "Synthetic Tech Academy",
    //         description: "Synthetic Tech Symposium explores the intersection of technology and engineering. Join us for thought-provoking discussions.",
    //         lastUpdated: "2023-11-29 08:15:00"
    //     },
    //     {
    //         id: 10,
    //         name: "InnoSphere Engineering Showcase",
    //         provider: "InnoSphere Engineering Institute",
    //         description: "Discover innovation within the sphere of engineering at the InnoSphere Engineering Showcase. A showcase of cutting-edge projects.",
    //         lastUpdated: "2023-12-01 20:50:00"
    //     }
    // ]

    // just filter by name or provider for now
    // const filteredEvents = events.filter((event) => {
    //     return event.name.toLowerCase().includes(eventSearchTerm.toLowerCase()) || event.provider.toLowerCase().includes(eventSearchTerm.toLowerCase());
    // });

    const getAllOrgs = async () => {
        try {
            // const response = await axios.get(GET_ALL_ORGS);
            // if (response.data.length === 0) setErrorMsg('No Organisations Found.');
            // if (response.data.length > 0) setErrorMsg('');
            // setOrgs(response.data);
            setOrgs(orgArr);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getAllOrgs();
    }, []);

    return (
        <div className='container col-12 m-0 p-0 mx-auto'>
            <ToastContainer />
            <div className="search-section row col-12 mx-0">
                <form className='row g-3 d-flex pt-5 mx-auto'>
                    <div className="search-bar col-md-8">
                        <input type="text" name="search" id="search" className="form-control form-input" placeholder='Type here...' onChange={(e) => {
                            setOrgSearchTerm(e.target.value);
                            // setEventSearchTerm(e.target.value);
                        }} />
                    </div>
                    {/* <div className="col-md-4">
                        <select className="form-select" id="type" aria-label="Type Select" onChange={(e) => {setType(e.target.value)}}>
                            <option defaultValue="provider">Choose Type</option>
                            <option value="provider">Provider</option>
                            <option value="event">Event</option>
                        </select>
                    </div> */}
                </form>
            </div>
            
            <div className="results-section row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5 my-5 p-3">
                {errorMsg !== '' ? <span className='text-danger fs-4'>{errorMsg}</span> : filteredOrgs.map((org, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="fs-4">{org.name}</h5>
                                    <p className="card-text">{org.description}</p>
                                    <button className="btn btn-outline-dark" onClick={(e) => {navigate(`orgdash/${org.id}`)}}>Read more...</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{getLastUpdated(org.lastUpdated)}</small>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {/* {(type === 'provider') ? filteredOrgs.map((org, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="fs-4">{org.name}</h5>
                                    <p className="card-text">{org.description}</p>
                                    <button className="btn btn-outline-dark" onClick={(e) => {navigate(`orgdash/${org.id}`)}}>Read more...</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{getLastUpdated(org.lastUpdated)}</small>
                                </div>
                            </div>
                        </div>
                    );
                }) : filteredEvents.map((event, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="fs-4">{event.name}</h5>
                                    <h5 className="fs-5">{event.provider}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <button className="btn btn-outline-dark" onClick={(e) => {navigate(`eventdash/${event.id}`)}}>Read more...</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{getLastUpdated(event.lastUpdated)}</small>
                                </div>
                            </div>
                        </div>
                    );
                })} */}
            </div>
        </div>
    );
}

export default CPDDashboard;