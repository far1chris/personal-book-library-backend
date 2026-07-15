// ref: 37aa88161f
import React, { useState, useMemo } from 'react';

// Helper to determine the left spine color based on book genre
function getSpineColor(genre) {
  if (!genre) return 'border-l-stone-300';
  const g = genre.toLowerCase().trim();
  if (g.includes('fantasy') || g.includes('แฟนตาซี')) return 'border-l-amber-600';
  if (g.includes('novel') || g.includes('นิยาย') || g.includes('fiction') || g.includes('วรรณกรรม')) return 'border-l-indigo-500';
  if (g.includes('history') || g.includes('ประวัติ')) return 'border-l-amber-800';
  if (g.includes('science') || g.includes('วิทย์') || g.includes('เทคโนโลยี')) return 'border-l-emerald-600';
  if (g.includes('biography') || g.includes('ชีวประวัติ') || g.includes('บันทึก')) return 'border-l-sky-500';
  if (g.includes('mystery') || g.includes('สืบสวน') || g.includes('ฆาตกรรม')) return 'border-l-rose-600';
  if (g.includes('self') || g.includes('พัฒนาตนเอง') || g.includes('จิตวิทยา') || g.includes('ธุรกิจ')) return 'border-l-teal-600';
  return 'border-l-amber-700'; // Default warm accent
}

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
            <div
              key={book._id}
              className={`group bg-white border border-stone-200 border-l-4 ${getSpineColor(
                book.genre
              )} rounded-xl p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between`}
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h4 className="text-lg font-bold font-serif text-stone-900 group-hover:text-amber-800 transition duration-200 leading-tight">
                    {book.title}
                  </h4>
                  {book.genre && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-100/60 shrink-0">
                      {book.genre}
                    </span>
                  )}
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-sm text-stone-600">
                    <span className="text-stone-400 font-medium">ผู้เขียน:</span> {book.author}
                  </p>
                  {book.publishedYear && (
                    <p className="text-xs text-stone-500">
                      <span className="text-stone-400 font-medium">ปีที่พิมพ์:</span> {book.publishedYear}
                    </p>
                  )}
                </div>

                {book.description && (
                  <p className="text-sm text-stone-500 leading-relaxed bg-[#FAF8F5] rounded-xl p-3 border border-stone-100 font-sans line-clamp-3 mb-4">
                    {book.description}
                  </p>
                )}
              </div>

              <div className="flex justify-end items-center pt-3 border-t border-stone-100">
                <button
                  onClick={() => onDelete(book._id)}
                  className="text-xs font-semibold text-stone-400 hover:text-rose-600 bg-stone-50 hover:bg-rose-50 px-3.5 py-1.5 rounded-lg border border-stone-200 hover:border-rose-200 transition"
                >
                  ลบหนังสือ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
