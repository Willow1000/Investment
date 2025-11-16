'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  backgroundColor: string;
  imageUrl: string;
}

interface HeroCarouselProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    title: 'Discover what your money is capable of',
    description: 'One app, every opportunity to build your future. Invest, earn, and send money in just a few taps.',
    cta: 'Open your account',
    ctaLink: '#',
    backgroundColor: 'bg-gradient-to-br from-amber-50 via-orange-50 to-pink-100',
    imageUrl: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=600&h=800&fit=crop',
  },
  {
    id: 2,
    title: 'New Bitso app: powerfully simple',
    description: 'The Bitso app has a new look. It\'s been redesigned to simplify and enhance your investment experience, evolving with you and the future of your finances.',
    cta: 'Download the new app',
    ctaLink: '#',
    backgroundColor: 'bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=800&fit=crop',
  },
  {
    id: 3,
    title: '5,000 stocks to grow your portfolio',
    description: 'Your full portfolio, finally, in one place. Invest in more than 5000 global stocks and ETFs together with your favorite crypto, anywhere.',
    cta: 'Download the app now',
    ctaLink: '#',
    backgroundColor: 'bg-gradient-to-br from-blue-100 via-sky-50 to-cyan-100',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides = defaultSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // 3.5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]); // Add slides.length as dependency to reset interval if slides change

  const slide = slides[currentSlide];

  return (
    <section className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${slide.backgroundColor}`}>
      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-8 lg:px-16 py-12 lg:py-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 pr-4 lg:pr-8">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {slide.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-10 max-w-2xl leading-relaxed">
            {slide.description}
          </p>
          <div>
            <a
              href={slide.ctaLink}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {slide.cta}
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:flex w-1/2 items-center justify-end pr-8">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="max-w-md h-auto object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-blue-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-blue-600" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'bg-white w-10 h-2'
                : 'bg-white/50 hover:bg-white/75 w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};