import { useState, useEffect } from 'react';
import { Book } from '../types';

const SHEET_ID = '1HlZ3QnzrNrsy_3p50-xkgpr11q70KHS195Mpc2K4YCs';
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

// Default image for books without an image URL
const DEFAULT_BOOK_IMAGE = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2342&auto=format&fit=crop';

// Special image mappings for specific books
const SPECIAL_IMAGES: Record<string, string> = {
  'The Anxious Generation': 'https://i.imgur.com/l4noBg6.jpeg',
  'Winning the War in Your Mind': 'https://i.imgur.com/JtSxjfV.jpeg',
  'Building a Non-Anxious Life': 'https://i.imgur.com/aODq2ns.jpeg'
};

export function useSpreadsheetData() {
  const [data, setData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const text = await response.text();
        const jsonString = text.substring(47).slice(0, -2);
        const jsonData = JSON.parse(jsonString);
        
        const books = jsonData.table.rows
          .slice(1) // Skip header row
          .filter((row: any) => row.c[0]?.v) // Filter out empty rows
          .map((row: any) => {
            const title = row.c[0]?.v || '';
            const url = row.c[1]?.v || '';
            const text = row.c[2]?.v || '';
            const category = row.c[3]?.v || 'General';
            const goodReads = parseFloat(row.c[4]?.v?.toString() || '0');
            const reviews = row.c[5]?.v?.toString() || '';
            let imgUrl = row.c[6]?.v || '';

            // Use special image if available, otherwise use provided URL or default
            imgUrl = SPECIAL_IMAGES[title] || imgUrl || DEFAULT_BOOK_IMAGE;

            return {
              title,
              url,
              text,
              category,
              goodReads: goodReads.toString(),
              reviews,
              imgUrl
            };
          })
          .sort((a, b) => {
            // Sort by rating in descending order
            const ratingA = parseFloat(a.goodReads);
            const ratingB = parseFloat(b.goodReads);
            return ratingB - ratingA;
          })
          .map((book, index) => ({
            ...book,
            rank: index + 1 // Add rank after sorting
          }));

        console.log('Fetched and sorted books:', books); // For debugging
        setData(books);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError('Failed to load data from spreadsheet');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}