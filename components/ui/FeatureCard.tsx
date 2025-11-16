import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  layout?: 'left' | 'right';
  children?: React.ReactNode;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  layout = 'left',
  children,
}) => {
  const contentOrder = layout === 'left' ? 'md:order-1' : 'md:order-2';
  const imageOrder = layout === 'left' ? 'md:order-2' : 'md:order-1';

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={contentOrder}>
            {icon && <div className="mb-4">{icon}</div>}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            {children}
          </div>

          {/* Image */}
          <div className={imageOrder}>
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-auto rounded-2xl object-cover"
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500 text-center">Image placeholder</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
