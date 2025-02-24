"use client"
import React from 'react';
import Loader from '../../ui/loader';
import loadable from '../../ui/lazy-load';
import HOME_TESTIMONINAL_CONTENT from '../../home/testimonials/constants';
import MobileHero from './mobileHero';
import MobileServices from './mobileServices';

// const LazyMobileHero = loadable(() => import('./mobileHero'), { loading: () => <Loader /> });
// const LazyMobileServices = loadable(() => import('./mobileServices'));
const LazyMobileTrusted = loadable(() => import('./MobileTrusted'));
const LazyMobileHire = loadable(() => import('./MobileHire'));
const LazyMobileWhyChoose = loadable(() => import('./MobileWhyChoose'));
const LazyMobileTestimonials = loadable(() => import('./MobileTestimonials'));
const LazyMobileFaqs = loadable(() => import('./MobileFaqs'));

const MobileHome: React.FC = () => (
  <div className='overflow-hidden'>
    <MobileHero />
    <MobileServices />
    <React.Suspense fallback={<Loader />}>
      <LazyMobileTrusted/>
      <LazyMobileHire />
      <LazyMobileWhyChoose />
      <LazyMobileTestimonials testimonials={HOME_TESTIMONINAL_CONTENT} />
      <LazyMobileFaqs />
    </React.Suspense>
  </div>
);

export default MobileHome;
