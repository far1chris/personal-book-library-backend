// ref: 37aa88161f
import React, { useState, useMemo } from 'react';
import BookCard from './BookCard';

export default function BookList({ books, onDelete, loading }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('ทั้งหมด');

  // Extract unique genres
  const genres = useMemo(() => {
    const list = books
      .map((b) => b.genre?.trim())
      .filter(Boolean);
    return ['ทั้งหมด', ...new Set(list)];
  }, [books]);

  // Filtered books based on Search & Genre Selection
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.genre && book.genre.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesGenre =
        selectedGenre === 'ทั้งหมด' ||
        book.genre?.trim().toLowerCase() === selectedGenre.toLowerCase();

      return matchesSearch && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  if (loading && books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-stone-400 bg-white border border-stone-250/60 rounded-2xl">
        <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium">กำลังเปิดตู้หนังสือ...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Section */}
      <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
        {/* Search input */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาตามชื่อหนังสือ, ผู้เขียน หรือหมวดหมู่..."
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl pl-11 pr-4 py-3 text-stone-900 placeholder-stone-400 outline-none transition text-sm"
          />
        </div>

        {/* Genre filters */}
        {genres.length > 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`text-xs px-3.5 py-1.5 rounded-lg border transition font-medium ${
                  (selectedGenre === genre)
                    ? 'bg-amber-700 border-amber-700 text-white shadow-sm'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-800'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Book Grid */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto mb-4 border border-stone-100">
            <svg
              className="w-8 h-8 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h4 className="text-stone-800 font-semibold mb-1 font-serif text-base">ไม่พบข้อมูลหนังสือ</h4>
          <p className="text-stone-500 text-sm">ลองค้นหาคำอื่น หรือเพิ่มหนังสือเล่มแรกเข้าสู่คลังของคุณ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
