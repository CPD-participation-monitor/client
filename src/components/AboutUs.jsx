import React from 'react';
import { images } from '../javascript/imageImports';

const AboutUs = () => {
    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-12 text-center my-5">
                    <h1 className="display-1 fw-bold my-5">About Us</h1>
                </div>
                <div className="img-container col-md-6 my-5">
                    <img src={images.blackpink} alt="blackpink" className="img-fluid p-5 my-5 mx-auto" />
                </div>
                <div className="col-md-6 text-start my-5">
                    <p className='fs-4'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure repellendus quia laborum officia aspernatur, non blanditiis aperiam illum dolorem suscipit autem consequuntur illo repudiandae molestiae dolores, animi optio culpa! Recusandae similique debitis architecto tenetur voluptate natus incidunt laborum praesentium nemo! Rem dolorem totam consequuntur nobis aliquid. Ullam non beatae odit sequi id, veritatis repellat. Placeat atque dolores neque nisi voluptate necessitatibus maxime quae sed earum molestiae optio asperiores accusamus et saepe eligendi totam temporibus quaerat fuga aliquid dolorum maiores, explicabo vitae. Tempore delectus aspernatur incidunt libero necessitatibus ullam ipsum ab possimus recusandae minima modi reprehenderit sed atque facilis, consequatur fugiat! Dolorem odit ad perspiciatis? Exercitationem mollitia explicabo, minus eaque porro ipsam voluptates nobis recusandae, quis earum hic quibusdam aperiam delectus qui officiis fugiat et enim deleniti laudantium odio iusto, nihil beatae. Magnam dolorem expedita aperiam, accusamus ea, rem debitis minima repellat dicta repellendus vitae! Facilis voluptas quaerat vitae aspernatur veritatis, tenetur praesentium totam culpa, sit, ullam earum. Commodi temporibus ratione porro laboriosam accusamus, corporis dignissimos harum. Tempore, dolor molestiae! Repellat blanditiis quam quas minima autem aperiam dolore eveniet, ullam saepe unde voluptates qui non totam tempore fugit libero facere atque nam veniam velit in dicta. Repudiandae aut placeat dolore accusantium aperiam omnis distinctio nulla corporis similique pariatur repellat quam voluptas id ullam quaerat error.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;