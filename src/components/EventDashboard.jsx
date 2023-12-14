import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const EventDashboard = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const GET_EVENT_DETAILS = `/event/${id}`;

    const getEventDetails = async () => {
        console.log('get event details');
        // try {
        //     const response = await axios.get(GET_EVENT_DETAILS);
        //     console.log(response.data);
        // } catch (error) {          
        //     console.log(error);
        // }
    }

    useEffect(() => {
        getEventDetails();
    });

    return (
        <div className='container-fluid event-dashboard col-10 m-0 mx-auto p-0 position-relative'>
            <ToastContainer />
            <section className="event-dashboard-title my-5">
                <h1 className='display-6 my-3'>Workshop Name</h1>
                <h2 className="fs-4 my-2">Organization Name</h2>
                <div className={`card border-0 rounded shadow p-3 my-3`}>
                    <div className="card-body">
                        <p className='light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam minus adipisci atque aspernatur perferendis, accusamus repudiandae? Neque ad incidunt nihil, optio quibusdam hic ab animi dicta temporibus, repudiandae cupiditate numquam ipsum provident illum accusantium qui unde! Quam dolore magni doloribus natus ipsum quia odio aliquid quod, tempore quidem aperiam et quaerat sint obcaecati, doloremque cupiditate delectus ducimus vitae. Laboriosam alias delectus magni laborum asperiores vero facere esse voluptatum, ipsam iste vitae quidem praesentium. Quos tenetur beatae dolore totam explicabo earum.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default EventDashboard;