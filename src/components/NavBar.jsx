import { React, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

import ROLES from '../constants/roles';

import { images } from '../javascript/imageImports';

const NavBar = () => {
    
    const [navLink, setNavLink] = useState('');
    const { currentUser } = useAuth();
    const location = useLocation();

    const scroll = () => {
        const navbar = document.getElementsByClassName('navbar')[0];
        window.onscroll = function(){
            if (window.scrollY > 80) {
                navbar.classList.remove('bg-transparent');
            } else {
                navbar.classList.add('bg-transparent');
            }
        };
    }

    useEffect(() => {
        scroll();
    });

    useEffect(() => {
        // console.log(currentUser?.role);
        setNavLink(currentUser?.role === ROLES.orgAdmin ? "/orgadmindash" : currentUser?.role === ROLES.eng ? "/engdash" : "/login");
    }, [currentUser]);

    return (
        <nav className={`navbar fixed-top navbar-expand-lg ${location.pathname.includes('/register') || location.pathname.includes('/login') ? "navbar-dark bg-dark" : "navbar-light bg-light"} m-0 p-0 py-3 bg-transparent`}>
            <div className="container-fluid">
                <HashLink className="navbar-brand" to="/">
                    <img className='logo img-fluid' src={images.logo_1} alt="logo" />
                </HashLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className={`navbar-nav justify-content-end py-3 ${currentUser ? "col-11" : "col-12"}`}>
                        <HashLink className="nav-link px-5 active" aria-current="page" to="/">What is CPD?</HashLink>
                        <HashLink className="nav-link px-5" to="/findcpd">Find CPD</HashLink>
                        <HashLink className="nav-link px-5" to="/about">About Us</HashLink>
                        <HashLink className="nav-link px-5" to={navLink}>My CPD</HashLink>
                    </div>
                    {currentUser ? <button className={`btn text-danger rounded-1 btn-outline-danger col-1`}  data-bs-toggle="modal" data-bs-target="#logout-modal">Log Out</button> : null}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;