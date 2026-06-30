'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }
    // Return to the home directory with the updated query params
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative glass-panel p-2 rounded-full flex items-center shadow-2xl transition-all duration-300 focus-within:ring-2 focus-within:ring-purple-500/50">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search AI tools (e.g., Marketing, Coding, Writing)..." 
        className="w-full bg-transparent border-none focus:ring-0 text-white px-6 py-3 placeholder-gray-500 outline-none text-sm md:text-base"
      />
      <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg cursor-pointer text-sm md:text-base flex-shrink-0">
        Search
      </button>
    </form>
  );
}
