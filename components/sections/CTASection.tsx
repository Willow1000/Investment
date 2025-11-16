import React from 'react';
import { Button } from '../ui/Button';

interface CTASectionProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaText,
  ctaHref,
  backgroundColor = 'bg-gradient-to-r from-blue-600 to-blue-700',
  backgroundImage,
}) => {
  return (
    <section
      className={`py-20 px-4 sm:px-6 lg:px-8 ${backgroundColor} relative overflow-hidden`}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {title}
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          {description}
        </p>
        <Button href={ctaHref} variant="secondary" size="lg">
          {ctaText}
        </Button>
      </div>
    </section>
  );
};
