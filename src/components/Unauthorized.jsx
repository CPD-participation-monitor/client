import React from 'react';
import { useNavigate } from 'react-router-dom';

import { images } from '../javascript/imageImports';

const Unauthorized = () => {
    const navigate = useNavigate();

    // meaning of -1: go back to the previous page
    const goBack = () => navigate(-1);

    return (
        <div className="success container-fluid col-12 px-0">
            <div className="success card bg-light mx-auto border-0 rounded-5 shadow col-md-6 col-sm-8 position-absolute text-center d-flex">
                <div className="card-body">
                    <h1 className='card-title text-uppercase p-5'>Unauthorized</h1>
                    <img className='check-mark img-fluid mx-auto' src={images.unauthorized} alt="unauthorized icon" />
                    <button className="btn btn-dark p-2 px-4 m-5" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default Unauthorized;