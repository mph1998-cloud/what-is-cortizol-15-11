import React from 'react';
import { Tool } from '../types';
import { Wrench } from 'lucide-react';

export default function ToolCard({ name, description, category, effectiveness, link }: Tool) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/5 backdrop-blur-sm rounded-xl p-6 card-hover"
    >
      <div className="flex items-start">
        <Wrench className="w-8 h-8 text-purple-500 mt-1" />
        <div className="ml-4">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            {name}
          </h3>
          <p className="text-gray-400 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
              {category}
            </span>
            <span className="text-sm text-gray-400">
              Effectiveness: {effectiveness}/5
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}