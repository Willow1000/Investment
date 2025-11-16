'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold mb-4">About Bitso</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-white transition">
                  All systems operational
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-white font-bold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crypto" className="hover:text-white transition">
                  Crypto
                </Link>
              </li>
              <li>
                <Link href="/stocks" className="hover:text-white transition">
                  Stocks
                </Link>
              </li>
              <li>
                <Link href="/earnings" className="hover:text-white transition">
                  Earnings
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="hover:text-white transition">
                  Transfers
                </Link>
              </li>
              <li>
                <Link href="/alpha" className="hover:text-white transition">
                  Alpha
                </Link>
              </li>
              <li>
                <Link href="/onchain" className="hover:text-white transition">
                  Onchain
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="hover:text-white transition">
                  Help center
                </Link>
              </li>
              <li>
                <Link href="/legal" className="hover:text-white transition">
                  Legal Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Bitso Group Section */}
          <div>
            <h3 className="text-white font-bold mb-4">Bitso Group</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/business" className="hover:text-white transition">
                  Bitso Business
                </Link>
              </li>
              <li>
                <Link href="/juno" className="hover:text-white transition">
                  Juno
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://twitter.com/bitso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com/bitso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com/bitso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com/bitso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com/company/bitso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="https://t.me/bitso" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="space-y-4 text-sm">
          <p className="text-gray-400">
            © 2014 - 2025 Bitso. All rights reserved. Bitso®
          </p>
          <p className="text-gray-400">
            This website provides information about, and access to accounts, products, and services offered by The Badger Technology Company Limited ("Bitso International") and its affiliates in various countries. It does not constitute, and should not be interpreted as an offer, invitation or solicitation to provide services to individuals or entities outside of the jurisdiction in which we operate.
          </p>
          <p className="text-gray-400">
            Terms, conditions, and fees applicable to our accounts products and services are subject to change. Not all accounts, products, services, or pricing described herein are available in all jurisdictions or to all customers.
          </p>
          <p className="text-gray-400">
            Bitso International and its affiliated entities operate in accordance with applicable licensing and regulatory requirements in the countries where services are offered.
          </p>
        </div>
      </div>
    </footer>
  );
};
