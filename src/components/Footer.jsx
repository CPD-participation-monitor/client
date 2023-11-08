import React, { useState, useEffect } from 'react';

import { images } from '../javascript/imageImports';
import { Facebook, Whatsapp, Instagram, Linkedin } from 'react-bootstrap-icons';
import { HashLink } from 'react-router-hash-link';

const Footer = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <footer className="footer m-0 mt-auto fixed-bottom position-relative bg-black" id='footer' style={{backgroundImage: `url(${images.color_sharp})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center'}}>
            <div className="container-fluid">
                    <div className="row text-center text-md-start">
                        <div className="contact-section col-10 col-md-6 p-2 p-sm-3 p-md-5 mx-auto">
                            <h2 className="display-5 contactus text-muted my-3">Contact Us</h2>
                            <form className='form'>
                                <div className="form-floating text-secondary mb-4">
                                    <input 
                                        type="text"
                                        className='form-control border-0 rounded-5'
                                        id="name"
                                        autoComplete='off'
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        placeholder='example name'
                                        required
                                    />
                                    <label htmlFor="name">Name</label>
                                </div>
                                <div className="form-floating text-secondary mb-4">
                                    <input 
                                        type="email"
                                        className='form-control border-0 rounded-5'
                                        id="email"
                                        autoComplete='off'
                                        onChange={e => setEmail(e.target.value)}
                                        value={name}
                                        placeholder='example@email.com'
                                        required
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="form-floating text-secondary mb-4">
                                    <textarea 
                                        type="text"
                                        className='form-control border-0 rounded-5'
                                        id="message"
                                        autoComplete='off'
                                        onChange={e => setMessage(e.target.value)}
                                        value={name}
                                        placeholder='message'
                                        required
                                        style={{height: '100px'}}
                                    />
                                    <label htmlFor="message">Message</label>
                                </div>
                                <button className='col-4 btn btn-outline-light mt-2 rounded-5 p-2' disabled={!email || !message || !name ? true : false}>Submit</button>
                            </form>
                        </div>
                        <div className="social-media-section col-10 col-md-6 p-2 p-sm-3 p-md-5 mx-auto">
                            <h2 className="display-5 socialmedia text-muted my-3">Social Media</h2>
                            <div className="social-media">
                                <HashLink className='me-4' to="https://www.facebook.com/">
                                    <Facebook color='blue' size={30} />
                                </HashLink>
                                <HashLink className='me-4' to="https://www.instagram.com/">
                                    <Instagram color='purple' size={30} /> 
                                </HashLink>
                                <HashLink className='me-4' to="#">
                                    <Whatsapp color='green' size={30} />
                                </HashLink>
                                <HashLink className='me-4' to="https://www.linkedin.com/">
                                    <Linkedin color='blue' size={30} />
                                </HashLink>
                            </div>
                        </div>
                        <div className="copyright">
                            {/* copyright text */}
                            <p className="text-center text-white">
                                &copy; 2023 <span className="text-uppercase">CPD Monitor</span> All rights reserved
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="image background-img-left" style={{backgroundImage: `url(${images.color_sharp})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center'}}></div> */}
        </footer>
    );
}

export default Footer;