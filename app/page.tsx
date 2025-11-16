import React from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import  { HeroCarousel } from '@/components/sections/HeroSection';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { CryptoCarousel } from '@/components/sections/CryptoCarousel';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTASection } from '@/components/sections/CTASection';
import { ProductsGrid } from '@/components/sections/ProductsGrid';
import { Button } from '@/components/ui/Button';
import { EarningsCard } from '@/components/ui/EarningsCard';

export default function Home() {
  // Crypto items for carousel
  const cryptoItems = [
    { symbol: 'ETH', name: 'Ether', color: 'blue' },
    { symbol: 'BTC', name: 'Bitcoin', color: 'orange' },
    { symbol: 'XRP', name: 'XRP', color: 'gray' },
    { symbol: 'SOL', name: 'Solana', color: 'teal' },
    { symbol: 'DOGE', name: 'Dogecoin', color: 'yellow' },
    { symbol: 'ADA', name: 'Cardano', color: 'blue' },
    { symbol: 'HYPE', name: 'HYPE', color: 'green' },
    { symbol: 'LTC', name: 'Litecoin', color: 'purple' },
    { symbol: 'BRL1', name: 'BRL1', color: 'lime' },
    { symbol: 'SUI', name: 'Sui', color: 'teal' },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: 'For me, the most reliable wallet, 10/10.',
      author: 'My favorite app since 2020.',
      source: 'App Store',
      rating: 5,
    },
    {
      quote: 'I like the sense of security that comes from how fast deposits, transfers, and real-time prices are.',
      author: 'Excellent',
      source: 'App Store',
      rating: 5,
    },
    {
      quote: "It's super practical, and I see it as a portable tool for my phone. Congrats, let's keep moving forward!",
      author: 'Great app',
      source: 'App Store',
      rating: 5,
    },
  ];

  // Products data
  const products = [
    {
      title: 'For Global Business',
      description: 'Bitso Business helps companies move money faster and smarter across the globe.',
      ctaText: 'Visit Bitso Business',
      ctaHref: '/business',
    },
    {
      title: 'For the Pro Trader',
      description: 'Take your strategy to the next level with Bitso Alpha, our trading platform with all the advanced tools you need.',
      ctaText: 'Start trading',
      ctaHref: '/alpha',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <HeroCarousel
        // title="Discover what your money is capable of"
        // subtitle="One app, every opportunity to build your future. Invest, earn, and send money in just a few taps."
        // ctaText="Open your account"
        // ctaHref="/signup"
        // backgroundGradient="from-pink-100 to-gray-100"
      />

      {/* Stocks Feature */}
      <FeatureCard
        title="5,000 stocks to grow your portfolio"
        description="Your full portfolio, finally, in one place. Invest in more than 5000 global stocks and ETFs together with your favorite crypto, anywhere."
        layout="left"
      >
        <Button href="/download" variant="primary">
          Download the app now
        </Button>
      </FeatureCard>

      {/* New App Feature */}
      <FeatureCard
        title="New Bitso app: powerfully simple"
        description="The Bitso app has a new look. It's been redesigned to simplify and enhance your investment experience, evolving with you and the future of your finances."
        layout="right"
      >
        <Button href="/download" variant="primary">
          Download the new app
        </Button>
      </FeatureCard>

      {/* Crypto Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Crypto, as easy as it should be
          </h2>
          <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Explore our selection of 100+ assets. Download the app, find your favorite crypto, and start building your portfolio.
          </p>
        </div>
      </section>

      {/* Crypto Carousel */}
      <CryptoCarousel items={cryptoItems} />

      {/* CTA - Stocks Coming */}
      <CTASection
        title="U.S. stocks are coming to your Bitso app"
        description="The wall between crypto and global stocks is coming down. Soon, you'll invest in 5,000+ global stocks and ETFs—anytime, anywhere, together with your crypto."
        ctaText="Join the waitlist"
        ctaHref="/waitlist"
        backgroundColor="bg-gradient-to-r from-blue-600 to-blue-700"
      />

      {/* Earnings Feature */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Your assets working for you
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Hold assets like USDC, USDT, ETH, DOT, ATOM, and SOL, and watch your balance grow. We handle the rest. Your earnings are deposited directly into your account every Monday, with no lock-ups.
              </p>
              <Button href="/earnings" variant="primary" size="lg">
                Start earning
              </Button>
            </div>

            <EarningsCard
              title="Bitso now"
              subtitle="Your weekly earnings have arrived! Check how much your balance has increased in the app."
              earnings={[
                { symbol: 'ATOM', rate: '10.5%', color: 'teal' },
                { symbol: 'USDC', rate: '4%', color: 'blue' },
                { symbol: 'ETH', rate: '2.53%', color: 'purple' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Transfers Feature */}
      <FeatureCard
        title="Your money, truly borderless"
        description="Cross-border transfers done right: fast, easy, and affordable. Send globally, receive locally. Easy and direct to your account."
        layout="left"
      >
        <Button href="/transfers" variant="primary">
          Move your money
        </Button>
      </FeatureCard>

      {/* Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">
                Bitso: where LATAM invests
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A record that speaks for itself: Bitso has been protecting your money with top security and international licenses for over a decade. With Bitso, you're in trusted hands.
              </p>
              <Button href="/signup" variant="primary" size="lg">
                Create your account
              </Button>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl flex items-center justify-center">
                <p className="text-gray-600 text-center">Trust & Security Illustration</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection
        title="Trusted by millions"
        testimonials={testimonials}
      />

      {/* Learning Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            A wealth of knowledge to get started
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Explore expert insights and simple guides designed to help you understand the future of money and invest smarter.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-8 inline-block">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What is Bitso and how does it work?
              </h3>
              <Button href="/learn" variant="outline">
                Read more
              </Button>
            </div>
          </div>
          <div className="mt-8">
            <Button href="/blog" variant="primary" size="lg">
              Start learning
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductsGrid
        title="We're way more than you imagine"
        products={products}
      />

      {/* Final CTA */}
      <CTASection
        title="Try Bitso. Start with just $10 USD."
        description="Discover what your money is capable of: Invest, earn and move money."
        ctaText="Start now"
        ctaHref="/signup"
        backgroundColor="bg-gradient-to-r from-blue-600 to-purple-600"
      />

      <Footer />
    </main>
  );
}
