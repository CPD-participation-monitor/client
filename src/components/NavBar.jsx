import { React, useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";

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
        setNavLink(currentUser?.role === 6445 ? "/orgadmindash" : "/userdash");
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
                    <div className="navbar-nav col-12 justify-content-end py-3">
                        <HashLink className="nav-link px-5 active" aria-current="page" to="/">What is CPD?</HashLink>
                        <HashLink className="nav-link px-5" to="/findcpd">Find CPD</HashLink>
                        <HashLink className="nav-link px-5" to="/about">About Us</HashLink>
                        <HashLink className="nav-link px-5" to={navLink}>My CPD</HashLink>
                        {/* <HashLink className="nav-link text-dark bg-warning rounded-1" to="/register-org">Become a CPD Provider</HashLink> */}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;