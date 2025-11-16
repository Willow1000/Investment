import React from 'react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

interface Product {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  icon?: React.ReactNode;
}

interface ProductsGridProps {
  title: string;
  products: Product[];
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({
  title,
  products,
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 hover:shadow-lg transition group"
            >
              {product.icon && (
                <div className="mb-6 text-4xl">
                  {product.icon}
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {product.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="inline-flex items-center">
                <Button
                  href={product.ctaHref}
                  variant="outline"
                  className="group-hover:bg-blue-50"
                >
                  {product.ctaText}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
