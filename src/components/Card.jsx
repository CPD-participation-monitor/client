import React from 'react';

const Card = ({ orgName, description, imgUrl }) => {
    return (
        <div className='col-10 col-sm-6 col-md-4'>
            <div className="org-box position-relative">
                <div className="org-name">
                    <h3>{orgName}</h3>
                    <span>{description}</span>
                </div>
                <img src={imgUrl} alt="logo" />
            </div>
        </div>
    );
}

export default Card;