import React from 'react';
import { App } from '../types';
import { Smartphone } from 'lucide-react';

export default function AppCard({ name, description, rating, downloads, icon, link }: App) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/5 backdrop-blur-sm rounded-xl p-6 card-hover"
    >
      <div className="flex items-center">
        <img
          src={icon}
          alt={name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="ml-4 flex-1">
          <h3 className="text-xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {name}
          </h3>
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Smartphone className="w-4 h-4 text-purple-500 mr-2" />
              <span className="text-sm text-gray-400">{downloads}</span>
            </div>
            <span className="text-sm text-gray-400">Rating: {rating}/5</span>
          </div>
        </div>
      </div>
    </a>
  );
}