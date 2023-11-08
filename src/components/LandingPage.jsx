import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { ArrowRightCircle, PatchCheckFill } from 'react-bootstrap-icons';

import { images } from '../javascript/imageImports';

const LandingPage = () => {

    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ['Monitoring Platform', 'for the modern professional'];
    const [text, setText] = useState(toRotate[0]);
    const [delta, setDelta] = useState(300 - Math.random() * 100);
    const period = 1000;

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        }
        else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        }
    }

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => clearInterval(ticker);
    }, [text]);

    const features = [
        {
            icon: <PatchCheckFill className="feature-icon" size={50} />, 
            title: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.'
        },
        {
            icon: <PatchCheckFill className="feature-icon" size={50} />, 
            title: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.'
        },
        {
            icon: <PatchCheckFill className="feature-icon" size={50} />, 
            title: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.'
        },
        {
            icon: <PatchCheckFill className="feature-icon" size={50} />, 
            title: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.'
        },
        {
            icon: <PatchCheckFill className="feature-icon" size={50} />, 
            title: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.'
        },
        {
            icon: <PatchCheckFill className="feature-icon" size={50} />, 
            title: 'Lorem ipsum dolor sit amet.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, voluptatum.'
        },
    ];

    return (
        <div className='home container-fluid col-12 m-0 p-0'>
            {/* hero section */}
            <section className="banner m-0 p-5 px-3" id="banner" style={{backgroundImage: `url(${images.abstract_bg_4})`, backgroundPosition: 'top center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                <div className="row align-items-center">
                    <div className="text-dark col-12 col-md-6 col-lg-7">
                        <span className="tagline fw-bolder px-3 py-2 mb-3 d-inline-block">Welcome to CPD Monitor</span>
                        <h1 className='display-1 fw-bold'>{`CPD `}
                            <span className="wrap display-1 fw-bold">{text}</span>
                        </h1>
                        <p className='py-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem placeat cumque dolores, iusto voluptatum impedit sapiente architecto repudiandae nihil, suscipit non esse explicabo perspiciatis facilis natus debitis nemo asperiores alias autem atque quae reprehenderit delectus maxime ea. At voluptatem qui, et itaque facilis, dolore aliquid ea nulla iusto, saepe sit?</p>
                        <button className="neon-button px-4 py-2 fw-bold fs-4 my-3 mt-5" onClick={() => console.log("explore")}>Explore
                            <ArrowRightCircle className="ms-2" size={20} />
                        </button>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5 my-3">
                        <img src={images.header_img_2} alt="Header img" className="img-fluid mx-auto" />
                    </div>
                </div>
            </section>

            <section className="description m-0 position-relative" id='description'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="description-box py-4 px-3 px-md-5 mb-5 col-12 col-sm-10 col-md-8 mx-auto">
                                <h2 className="display-3 fw-bold text-center text-light my-3">What is CPD?</h2>
                                <p className='text-muted'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis, quia similique aperiam rerum repellendus animi non, et, omnis atque magni eius officia dolorem! Dolores nemo, cumque esse vero architecto pariatur vitae nesciunt blanditiis quis assumenda. Iste quis reprehenderit exercitationem, sit quaerat sapiente, nemo voluptates voluptatem nihil pariatur quos praesentium adipisci eveniet voluptatibus nulla provident officiis blanditiis. Quis accusamus facere ea autem minus, voluptatum, a excepturi quam voluptates officiis aliquam est, nulla quas veniam dolor suscipit cum dolores animi consequuntur in vitae tempora. Ipsa debitis hic accusantium, placeat quisquam quam quod exercitationem. Sed dolorem, expedita asperiores earum necessitatibus, laboriosam sapiente quaerat officia nihil eum culpa eius mollitia nulla illum eos quo? Aperiam culpa molestiae modi consequatur voluptatibus, vel consectetur expedita maiores reiciendis earum placeat sapiente cumque magnam, eos officiis fugit quia tempore iste vitae. Tempore repellat nisi alias sint porro ipsam id esse a, magni cumque odio deserunt, necessitatibus deleniti odit.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="image background-img-left" style={{backgroundImage: `url(${images.color_sharp})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center'}}></div> */}
            </section>

            <section className="description-challenges m-0 position-relative" id='description-challenges'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="description-challenges-box py-4 px-3 px-md-5 col-12 col-sm-10 col-md-6 mx-auto mx-sm-0 ms-md-4 me-md-auto position-relative">
                                <h2 className="display-3 fw-bold text-center text-dark my-3">Challenges</h2>
                                <ul className='text-start'>
                                    <li>
                                        <p className='text-muted p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                    <li>
                                        <p className='text-muted p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                    <li>
                                        <p className='text-muted p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                    <li>
                                        <p className='text-muted p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image abstract-bg-5" style={{backgroundImage: `url(${images.abstract_bg_1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center'}}></div>
            </section>

            <section className="description-benefits m-0 position-relative" id='description-benefits'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="description-benefits-box py-4 px-5 mb-5 col-12 col-sm-10 col-md-8 mx-auto mx-sm-0 ms-sm-auto me-md-4">
                                <h2 className="display-3 fw-bold text-center text-dark my-3">Benefits of CPD</h2>
                                <ul className='benefits-list text-start'>
                                    <li>
                                        <p className='p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                    <li>
                                        <p className='p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                    <li>
                                        <p className='p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                    <li>
                                        <p className='p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias rerum ratione sapiente, temporibus tenetur ab voluptates hic debitis nobis veritatis.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="image background-img-left" style={{backgroundImage: `url(${images.color_sharp})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center'}}></div> */}
            </section>

            <section className="description-features m-0 position-relative" id='description-features'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="description-features-box p-5 mb-5 col-12 col-sm-10 col-md-8 mx-auto shadow-lg">
                                <h2 className="display-3 fw-bold text-center text-dark my-5 mt-3">Features</h2>
                                <div className="row">
                                    {
                                        features.map((feature, i) => {
                                            return (
                                                <div className="col-12 col-sm-6 col-md-4 my-3 px-5" key={i}>
                                                    <div className="feature-box p-3">
                                                        {feature.icon}
                                                        <h3 className="text-center">{feature.title}</h3>
                                                        <p className="text-muted">{feature.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image abstract-bg-5" style={{backgroundImage: `url(${images.abstract_bg_3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'top center'}}></div>
            </section>

            <Footer />
        </div>
    );
}

export default LandingPage;