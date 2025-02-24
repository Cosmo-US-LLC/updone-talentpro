"use client"
import React from 'react';
import Loader from '../ui/loader';
import HOME_TESTIMONINAL_CONTENT from './testimonials/constants';
import loadable from '../ui/lazy-load';
import Hero from './hero';
import Services from './services';
// import OurSponsors from './sponsors';
// import HowWork from './how-work';
// import Security from './security';
// import Testimonials from './testimonials';
// import Accordion from './faqs';

// const LazyHero = loadable(() => import('./hero'), { loading: () => <Loader /> });
// const LazyServices = loadable(() => import('./services'));
const LazyOurSponsors = loadable(() => import('./sponsors'));
const LazyHowWork = loadable(() => import('./how-work'));
const LazySecurity = loadable(() => import('./security'));
const LazyTestimonials = loadable(() => import('./testimonials'));
const LazyAccordion = loadable(() => import('./faqs'));

const Home: React.FC = () => (
  <div className='overflow-hidden'>
    <Hero />
    <Services />
    {/* <OurSponsors />
    <HowWork />
    <Security />
    <Testimonials testimonials={HOME_TESTIMONINAL_CONTENT} />
    <Accordion /> */}
    <React.Suspense fallback={<Loader />}>
      {/* <LazyHero />
      <LazyServices /> */}
      <LazyOurSponsors />
      <LazyHowWork />
      <LazySecurity />
      <LazyTestimonials testimonials={HOME_TESTIMONINAL_CONTENT} />
      <LazyAccordion />
    </React.Suspense>
  </div>
);

export default Home;
