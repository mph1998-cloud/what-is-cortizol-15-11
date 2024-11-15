import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { useSpreadsheetData } from './hooks/useSpreadsheetData';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import LoadingSpinner from './components/LoadingSpinner';
import { Book } from './types';

export default function App() {
  const { data: books, loading, error } = useSpreadsheetData();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#0F172A] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
        <div className="container mx-auto px-4 py-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-float mb-4 relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
              <Brain className="w-12 h-12 mx-auto text-blue-400 relative z-10" />
            </div>
            <h1 className="text-3xl font-bold mb-3 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                What is Cortisol?
              </span>
            </h1>
            <p className="text-sm text-gray-400">
              Cortisol is your body's main stress hormone. Below you'll find curated resources to help you understand, manage, and reduce your cortisol levels for better health and well-being.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-red-400 text-center p-8 bg-red-500/10 rounded-xl">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {books.map((book, index) => (
              <div 
                key={book.title}
                className="transform hover:scale-105 transition-transform duration-300 slide-up" 
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BookCard 
                  {...book}
                  onOpenModal={() => setSelectedBook(book)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBook && (
        <BookModal 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </div>
  );
}