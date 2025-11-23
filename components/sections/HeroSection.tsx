'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index % slides.length);
      setIsTransitioning(false);
    }, 300);
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  // Start auto-scroll
  const startAutoScroll = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Start new interval
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 3500);
  }, [isTransitioning, nextSlide]);

  // Reset timer for current slide
  const resetTimer = useCallback(() => {
    startAutoScroll();
  }, [startAutoScroll]);

  // Initialize auto-scroll
  useEffect(() => {
    startAutoScroll();
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startAutoScroll]);

  const slide = slides[currentSlide];

  const handleSlideClick = () => {
    // Reset the timer for the current slide (t=0)
    resetTimer();
  };

  return (
    <section 
      className={`relative w-full h-screen overflow-hidden transition-all duration-700 ease-in-out ${slide.backgroundColor} ${
        isTransitioning ? 'opacity-95' : 'opacity-100'
      }`}
      onClick={handleSlideClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Slide Content */}
      <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-8 lg:px-16 py-12 lg:py-0">
        {/* Left Content */}
        <div className={`w-full lg:w-1/2 flex flex-col justify-center z-10 pr-4 lg:pr-8 transition-all duration-700 ease-in-out ${
          isTransitioning ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'
        }`}>
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
              onClick={(e) => e.stopPropagation()} // Prevent slide click when clicking CTA
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
            className={`max-w-md h-auto object-cover rounded-3xl shadow-2xl transition-all duration-700 ease-in-out ${
              isTransitioning ? 'translate-x-4 opacity-0 scale-95' : 'translate-x-0 opacity-100 scale-100'
            }`}
          />
        </div>
      </div>

      {/* Navigation Container - Aligned horizontally */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
            resetTimer();
          }}
          className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
        </button>

        {/* Pagination Dots */}
        <div className="flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
                resetTimer();
              }}
              className="group relative flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Dot container with consistent size */}
              <div className="w-10 h-8 flex items-center justify-center">
                {/* Active dot with blue fill and animation */}
                <div className={`
                  relative rounded-full transition-all duration-500 ease-out
                  ${index === currentSlide 
                    ? 'bg-blue-600 w-10 h-2 shadow-lg' 
                    : 'bg-white/60 w-2 h-2 group-hover:bg-white/80 group-hover:scale-110'
                  }
                `}>
                  {/* Pulse animation for active dot */}
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-30" />
                  )}
                </div>
              </div>
              
              {/* Slide number tooltip on hover */}
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/75 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                  Slide {index + 1}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
            resetTimer();
          }}
          className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="text-blue-600 group-hover:text-blue-700 transition-colors" />
        </button>
      </div>

      {/* Click instruction overlay */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          Click to reset timer
        </div>
      </div>
    </section>
  );
};