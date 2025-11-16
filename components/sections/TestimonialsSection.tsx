'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  source: string;
  rating: number;
}

interface TestimonialsSectionProps {
  title: string;
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title,
  testimonials,
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-6 italic text-lg">
                "{testimonial.quote}"
              </p>

              {/* Author and Source */}
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.source}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
