import { Typography } from "@material-tailwind/react";
import imageImports from "../utils/imageImports";

const Home = () => {
  return (
    <div className="md:container mx-auto px-4 md:px-16 py-8">
      <section className="hero-section grid grid-cols-1 md:grid-cols-2">
        <div className="hero-text flex flex-col justify-center">
          <Typography variant='h1' color='blue-gray' className='mb-4'>
            Welcome to the CPD Portal
          </Typography>
          <Typography variant='paragraph' color='blue-gray'>
            The CPD Portal is a platform that allows CPD providers to create events and CPD participants to join those events.
          </Typography>
        </div>
        <div className="hero-image">
          <img
            className="h-full w-full rounded-lg object-cover object-center"
            src={imageImports.heroImage}
            alt="hero section image"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;