import React from 'react';
import Footer from './Footer';

import { images } from '../javascript/imageImports';

const LandingPage = () => {
    return (
        <div className='home container-fluid col-12 m-0 p-0'>
            <section className='hero-section' style={{backgroundImage: `url(${images.cover_1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div className="hero-title position-absolute">
                    <h1 className='display-1 fw-bolder mx-5'>Continuing Professional <br />Development</h1>
                    <h2 className='mx-5'>for the modern professional</h2>
                </div>
            </section>

            <section className="whatiscpd-section text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="display-1 fw-bold my-5">What is CPD?</h2>
                            <p className='fs-4 my-5'>Continuous Professional Development (CPD) is a structured and ongoing process that professionals undertake to enhance their knowledge, skills, and competencies throughout their careers. It's a crucial aspect of professional growth and is vital in many fields, including medicine, law, engineering, teaching, and various other industries. CPD is often mandatory in certain professions to ensure that practitioners stay up-to-date and provide the best possible service to their clients or patients. Here's a detailed breakdown of CPD, categorized into sections:</p>
                        </div>
                    </div>
                </div>
            </section>

            

            <Footer />
        </div>
    );
}

export default LandingPage;