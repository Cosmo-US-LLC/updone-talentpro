import React from 'react';
import Loader from '../../ui/loader';
import loadable from '../../ui/lazy-load';
import HOME_TESTIMONINAL_CONTENT from '../../home/testimonials/constants';
const LazyMobileHero = loadable(() => import('./mobileHero'), { loading: () => <Loader /> });
const LazyMobileServices = loadable(() => import('./mobileServices'));
const LazyMobileTrusted = loadable(() => import('./MobileTrusted'));
const LazyMobileHire = loadable(() => import('./MobileHire'));
const LazyMobileWhyChoose = loadable(() => import('./MobileWhyChoose'));
const LazyMobileTestimonials = loadable(() => import('./MobileTestimonials'));
const LazyMobileFaqs = loadable(() => import('./MobileFaqs'));

const MobileHome: React.FC = () => (
  <div className='overflow-hidden'>
    <React.Suspense fallback={<Loader />}>
      <LazyMobileHero />
      <LazyMobileServices />
      <LazyMobileTrusted/>
      <LazyMobileHire />
      <LazyMobileWhyChoose />
      <LazyMobileTestimonials testimonials={HOME_TESTIMONINAL_CONTENT} />
      <LazyMobileFaqs />
    </React.Suspense>
  </div>
);

export default MobileHome;
