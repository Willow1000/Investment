import React from 'react';

interface EarningItem {
  symbol: string;
  rate: string;
  color: string;
}

interface EarningsCardProps {
  title: string;
  subtitle: string;
  earnings: EarningItem[];
  image?: string;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  title,
  subtitle,
  earnings,
  image,
}) => {
  const colorMap: { [key: string]: string } = {
    blue: 'bg-blue-100 text-blue-700',
    teal: 'bg-teal-100 text-teal-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="relative">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm opacity-90">{subtitle}</p>
        </div>
      </div>

      {/* Earnings List */}
      <div className="p-6 space-y-4">
        {earnings.map((earning, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-lg ${colorMap[earning.color] || 'bg-gray-100'}`}
          >
            <span className="font-semibold">{earning.symbol}</span>
            <span className="text-lg font-bold">{earning.rate}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
