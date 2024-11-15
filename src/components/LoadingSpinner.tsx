import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}