import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    // meaning of -1: go back to the previous page
    const goBack = () => navigate(-1);

    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You are not authorized to view this page.</p>
            <button onClick={goBack}>Go Back</button>
        </div>
    );
}

export default Unauthorized;