import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { montserrat } from '@/app/lib/Fonts';
import loadable from '../../ui/lazy-load';

const TestimonialCard = loadable(() => import('./components/TestimonialCard'));

interface Testimonial {
  avatarSrc: string;
  name: string;
  content: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  isDetailTestonial?: boolean;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials, isDetailTestonial }) => {
  return (
    <section className="relative py-[100px] min-w-[1024px] max-w-[1280px] mx-auto overflow-hidden">
      <div className="absolute top-[-102px] z-[999] right-0">
        <svg width="300" height="300" viewBox="0 0 574 595" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.1"
            d="M1096 47C1096 349.652 850.652 595 548 595C245.348 595 0 349.652 0 47C0 -255.652 245.348 -501 548 -501C850.652 -501 1096 -255.652 1096 47ZM3.99622 47C3.99622 347.445 247.555 591.004 548 591.004C848.445 591.004 1092 347.445 1092 47C1092 -253.445 848.445 -497.004 548 -497.004C247.555 -497.004 3.99622 -253.445 3.99622 47Z"
            fill="#350ABC"
          />
        </svg>
      </div>

      <div className="absolute bottom-[-97px] left-[-9px]">
        <svg width="258" height="269" viewBox="0 0 498 269" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.1"
            d="M498 256C498 397.385 383.385 512 242 512C100.615 512 -14 397.385 -14 256C-14 114.615 100.615 0 242 0C383.385 0 498 114.615 498 256ZM-3.71143 256C-3.71143 391.703 106.297 501.711 242 501.711C377.703 501.711 487.711 391.703 487.711 256C487.711 120.297 377.703 10.2886 242 10.2886C106.297 10.2886 -3.71143 120.297 -3.71143 256Z"
            fill="#350ABC"
          />
        </svg>
      </div>

      {/* Testimonials heading and description */}
      <div>
        <h2 className={`${montserrat.className} text-[56px] font-[600] text-center uppercase`}>
          Testimonials
        </h2>
        <p className={`${montserrat.className} text-[18px] text-[#6B6B6B] text-center`}>
          At Updone we are committed to pushing the boundaries of what’s possible.
        </p>
      </div>

      {/* Testimonials Slider */}
      <div className="max-w-[1279px] mx-auto 2xl:max-w-[1440px]">
        <Slide
          autoplay={true}
          transitionDuration={800}
          duration={2000}
          infinite={true}
          indicators={false}
          pauseOnHover={true}
          arrows={false}
          slidesToScroll={1}
          slidesToShow={3}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-4">
              <TestimonialCard
                name={testimonial.name}
                content={testimonial.content}
                avatarSrc={testimonial.avatarSrc}
              />
            </div>
          ))}
        </Slide>
      </div>
    </section>
  );
};

export default Testimonials;
