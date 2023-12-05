import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { images } from '../javascript/imageImports';

const SuccessNotification = () => {
    return (
        <div className="success container-fluid col-12 row m-0 p-0 position-relative" style={{backgroundImage: `url(${images.abstract_bg_6})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <div className="row m-0 p-0">
                <div className="col-12 col-sm-10 m-0 p-0 mx-auto d-flex align-items-center">
                    <div className="success-card card bg-light m-0 mx-auto px-sm-3 border-0 rounded-5 shadow col-10 col-md-6 col-lg-4 text-center">
                        <div className="card-body d-flex flex-column justify-content-center">
                            <h1 className='card-title text-uppercase'>Success!</h1>
                            <img className='check-mark img img-fluid mx-auto my-5' src={images.check} alt="green check mark" />
                            <HashLink className='text-decoration-none' to="/login">
                                <button className="btn btn-dark p-2 px-4 my-3">Sign In</button>
                            </HashLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessNotification;