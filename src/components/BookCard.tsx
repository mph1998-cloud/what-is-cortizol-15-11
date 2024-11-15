import React from 'react';
import { Book } from '../types';
import { Star } from 'lucide-react';

interface BookCardProps extends Book {
  onOpenModal: () => void;
}

export default function BookCard({ 
  title, 
  imgUrl, 
  goodReads,
  reviews,
  rank,
  onOpenModal 
}: BookCardProps) {
  return (
    <div 
      onClick={onOpenModal}
      className="group relative bg-white/5 rounded-xl overflow-hidden border border-blue-500/20 backdrop-blur-sm cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Rank Badge */}
      {rank && (
        <div className="absolute top-2 right-2 z-10 bg-blue-500/90 text-white w-6 h-6 text-xs rounded-full flex items-center justify-center font-bold shadow-lg">
          {rank}
        </div>
      )}
      
      {/* Image Container */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1 line-clamp-2">
          {title}
        </h3>
        
        {goodReads && (
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400" />
            <span className="text-xs text-gray-400">{goodReads} ({reviews} reviews)</span>
          </div>
        )}
      </div>
    </div>
  );
}