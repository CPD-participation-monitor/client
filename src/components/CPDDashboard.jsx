import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CPDDashboard = () => {

    const [type, setType] = useState(useParams().type);
    const [orgs, setOrgs] = useState([]);
    const [events, setEvents] = useState([]);

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
            name: 'Organization 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-23 18:34:00'
        },
        {
            name: 'Organization 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Organization 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Organization 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Organization 5',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Organization 6',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Organization 7',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Organization 8',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            logo: '...',
            lastUpdated: '2023-11-25 18:34:00'
        }
    ]

    const eventArr = [
        {
            name: 'Event 1',
            provider: 'Organization 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-23 18:34:00'
        },
        {
            name: 'Event 2',
            provider: 'Organization 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Event 3',
            provider: 'Organization 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Event 4',
            provider: 'Organization 4',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Event 5',
            provider: 'Organization 5',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Event 6',
            provider: 'Organization 6',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-25 18:34:00'
        },
        {
            name: 'Event 7',
            provider: 'Organization 7',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt natus est delectus doloremque.',
            lastUpdated: '2023-11-25 18:34:00'
        }
    ]

    useEffect(() => {
        setOrgs(orgArr);
        setEvents(eventArr);
    }, []);

    return (
        <div className='container col-12 m-0 p-0 mx-auto'>
            <div className="search-section row col-12 mx-0">
                <form className='row g-3 d-flex pt-5 mx-auto'>
                    <div className="search-bar col-md-8">
                        <input type="text" name="search" id="search" className="form-control form-input" placeholder='Type here...' />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" id="type" aria-label="Type Select" onChange={(e) => {setType(e.target.value)}}>
                            <option defaultValue="provider">Choose Type</option>
                            <option value="provider">Provider</option>
                            <option value="event">Event</option>
                        </select>
                    </div>
                </form>
            </div>
            
            <div className="results-section row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5 my-5 p-3">
                {(type === 'provider') ? orgs.map((org, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="fs-4">{org.name}</h5>
                                    <p className="card-text">{org.description}</p>
                                    <button className="btn btn-outline-dark">Read more...</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{getLastUpdated(org.lastUpdated)}</small>
                                </div>
                            </div>
                        </div>
                    );
                }) : events.map((event, index) => {
                    return (
                        <div className="col" key={index}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="fs-4">{event.name}</h5>
                                    <h5 className="fs-5">{event.provider}</h5>
                                    <p className="card-text">{event.description}</p>
                                    <button className="btn btn-outline-dark">Read more...</button>
                                </div>
                                <div className="card-footer">
                                    <small className="text-muted">{getLastUpdated(event.lastUpdated)}</small>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CPDDashboard;