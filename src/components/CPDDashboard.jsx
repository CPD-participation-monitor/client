import React from 'react';

const CPDDashboard = () => {
    return (
        <div className='container col-12 m-0 p-0 mx-auto'>
            <div className="search-section row my-5 col-12 mx-0">
                <form className='row g-3 my-5 d-flex pt-5'>
                    <div className="search-bar col-md-8">
                        <input type="text" name="search" id="search" className="form-control form-input" placeholder='Type here...' />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" id="type" aria-label="Type Select">
                            <option defaultValue="provider">Choose Type</option>
                            <option value="provider">Provider</option>
                            <option value="event">Event</option>
                        </select>
                    </div>
                </form>
            </div>
            
            <div className="results-section row my-5">

            </div>
        </div>
    );
}

export default CPDDashboard;