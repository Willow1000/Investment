'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CryptoItem {
  symbol: string;
  name: string;
  color: string;
  icon?: string;
}

interface CryptoCarouselProps {
  items?: CryptoItem[];
  title?: string;
  scrollSpeed?: number;
}

const defaultCryptoItems: CryptoItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', color: 'orange' },
  { symbol: 'XRP', name: 'XRP', color: 'gray' },
  { symbol: 'SOL', name: 'Solana', color: 'teal' },
  { symbol: 'DOGE', name: 'Dogecoin', color: 'yellow' },
  { symbol: 'ADA', name: 'Cardano', color: 'blue' },
  { symbol: 'HYPE', name: 'HYPE', color: 'green' },
  { symbol: 'LTC', name: 'Litecoin', color: 'purple' },
  { symbol: 'BRL1', name: 'BRL1', color: 'lime' },
  { symbol: 'SUI', name: 'Sui', color: 'teal' },
  { symbol: 'HBAR', name: 'Hedera', color: 'blue' },
  { symbol: 'SPX', name: 'SPX6900', color: 'orange' },
  { symbol: 'PENGU', name: 'Pudgy Penguins', color: 'purple' },
  { symbol: 'BONK', name: 'BONK', color: 'yellow' },
  { symbol: 'ETH', name: 'Ether', color: 'purple' },
];

export const CryptoCarousel: React.FC<CryptoCarouselProps> = ({
  items = defaultCryptoItems,
  title = 'Explore Cryptocurrencies',
  scrollSpeed = 5, // Adjusted to 5 for a moderate speed
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPositionRef = useRef(0);
  const itemWidthRef = useRef(0);
  const isUserInteractingRef = useRef(false);
  // Use a ref to track hover state across all elements
  const isHoveringRef = useRef(false); 

  // Duplicate items for seamless infinite scroll
  const duplicatedItems = [...items, ...items, ...items];

  // Calculate item width including gap
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Find the first item inside the container
      const firstItem = container.querySelector('.carousel-item') as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const gap = 24; // gap-6 = 1.5rem = 24px
        itemWidthRef.current = itemWidth + gap;
      }
    }
  }, [items.length]);

  const getSectionWidth = useCallback(() => {
    return items.length * itemWidthRef.current;
  }, [items.length]);

  const checkAndResetScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const sectionWidth = getSectionWidth();
    const currentScroll = container.scrollLeft;
    
    // Reset to middle section when reaching the end of right section
    if (currentScroll >= sectionWidth * 2) {
      container.scrollLeft = sectionWidth + (currentScroll - sectionWidth * 2);
      scrollPositionRef.current = container.scrollLeft;
    }
    // Reset to middle section when reaching the start of left section
    else if (currentScroll <= 0) {
      container.scrollLeft = sectionWidth + currentScroll;
      scrollPositionRef.current = container.scrollLeft;
    }
  }, [getSectionWidth]);

  const handleUserInteractionStart = useCallback(() => {
    isUserInteractingRef.current = true;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleUserInteractionEnd = useCallback(() => {
    isUserInteractingRef.current = false;
    // Only restart if not hovering
    if (!isHoveringRef.current) {
        startAutoScroll();
    }
  }, []);

  // Modified hover handlers to use the ref and ensure animation is cancelled/restarted correctly
  const handleCarouselHover = useCallback(() => {
    isHoveringRef.current = true;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleCarouselLeave = useCallback(() => {
    isHoveringRef.current = false;
    // Only restart if not interacting (e.g., dragging)
    if (!isUserInteractingRef.current) {
      startAutoScroll();
    }
  }, []);

  const startAutoScroll = useCallback(() => {
    // Check if we should stop auto-scrolling
    if (isUserInteractingRef.current || isHoveringRef.current || !scrollContainerRef.current) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    let lastTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Re-check stop conditions inside the animation loop
      if (isUserInteractingRef.current || isHoveringRef.current || !scrollContainerRef.current) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        return;
      }

      // The scroll amount is calculated based on scrollSpeed and time elapsed
      // Dividing by 16 is a common way to normalize for a 60fps (1000ms/60fps ≈ 16.67ms) frame rate
      const scrollAmount = (scrollSpeed * deltaTime) / 16;
      
      if (scrollContainerRef.current) {
        scrollPositionRef.current += scrollAmount;
        scrollContainerRef.current.scrollLeft = scrollPositionRef.current;
        
        // Check and reset scroll position for infinite effect
        checkAndResetScroll();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [scrollSpeed, checkAndResetScroll]);

  useEffect(() => {
    // Initialize scroll position to middle section for infinite scroll
    if (scrollContainerRef.current) {
      const sectionWidth = getSectionWidth();
      scrollContainerRef.current.scrollLeft = sectionWidth;
      scrollPositionRef.current = sectionWidth;
    }

    startAutoScroll();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startAutoScroll, getSectionWidth]);

  // The original component had an extra useEffect for hovering, which is now redundant
  // because the hover logic is managed by the ref and the startAutoScroll function's checks.

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      handleUserInteractionStart();
      
      const scrollAmount = 400;
      const newPosition = scrollPositionRef.current + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      
      scrollPositionRef.current = newPosition;
      
      // Check for infinite scroll after animation and resume auto-scroll
      setTimeout(() => {
        checkAndResetScroll();
        // Use a slightly longer timeout to ensure smooth scroll completes before resuming
        setTimeout(() => handleUserInteractionEnd(), 500); 
      }, 400);
    }
  };

  const colorMap: { [key: string]: string } = {
    orange: 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-orange-200',
    gray: 'bg-gradient-to-br from-gray-500 to-gray-700 shadow-gray-200',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-teal-200',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-700 shadow-yellow-200',
    blue: 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-200',
    green: 'bg-gradient-to-br from-green-500 to-green-700 shadow-green-200',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-700 shadow-purple-200',
    lime: 'bg-gradient-to-br from-lime-500 to-lime-700 shadow-lime-200',
  };

  const iconMap: { [key: string]: string } = {
    BTC: '₿',
    ETH: 'Ξ',
    SOL: '◎',
    DOGE: 'Ð',
    ADA: 'A',
    LTC: 'Ł',
    XRP: '✕',
    HYPE: '⚡',
    BRL1: '💎',
    SUI: '💧',
    HBAR: '⚡',
    SPX: '📈',
    PENGU: '🐧',
    BONK: '🐶',
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          {title}
        </h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200 hover:border-blue-300"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} className="text-blue-600" />
          </button>

          {/* Carousel Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkAndResetScroll}
            // Apply hover handlers to the main container
            onMouseEnter={handleCarouselHover}
            onMouseLeave={handleCarouselLeave}
            onTouchStart={handleUserInteractionStart}
            onTouchEnd={handleUserInteractionEnd}
            onWheel={handleUserInteractionStart}
            className="flex overflow-x-hidden gap-6 pb-8 px-2 scrollbar-hide"
            style={{ 
              scrollBehavior: 'auto',
            }}
          >
            {duplicatedItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 group cursor-pointer transform transition-all duration-300 hover:scale-105 active:scale-95 carousel-item"
                // Remove hover handlers from individual items to prevent flickering
                // The main container handles the hover-to-pause for the entire carousel area
              >
                <div
                  className={`w-44 h-52 rounded-3xl ${colorMap[item.color] || 'bg-gradient-to-br from-gray-500 to-gray-700'} p-6 flex flex-col items-center justify-center text-center shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-white/20`}
                >
                  {/* Animated background shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                  
                  {/* Icon with better styling */}
                  <div className="text-5xl font-bold text-white/95 mb-3 drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {iconMap[item.symbol] || item.symbol.substring(0, 1)}
                  </div>
                  
                  {/* Symbol */}
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md tracking-wide">
                    {item.symbol}
                  </h3>
                  
                  {/* Name */}
                  <p className="text-white/90 text-sm font-medium tracking-wide">
                    {item.name}
                  </p>
                  
                  {/* Decorative dots */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/30 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-110 border border-gray-200 hover:border-blue-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} className="text-blue-600" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
