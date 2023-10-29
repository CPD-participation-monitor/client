import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { images } from '../javascript/imageImports';

const SuccessNotification = () => {
    return (
        <div className="success container-fluid col-12 px-0" style={{backgroundImage: `url(${images.bg_jungle_landscape_3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="success card bg-light mx-auto border-0 rounded-5 shadow col-lg-4 col-md-6 col-sm-8 position-absolute text-center d-flex">
                <div className="card-body">
                    <h1 className='card-title text-uppercase p-5'>Success!</h1>
                    <img className='check-mark img-fluid mx-auto' src={images.check} alt="green check mark" />
                    <HashLink className='text-decoration-none' to="/login">
                        <button className="btn btn-dark p-2 px-4 m-5">Sign In</button>
                    </HashLink>
                </div>
            </div>
        </div>
    )
}

export default SuccessNotification;