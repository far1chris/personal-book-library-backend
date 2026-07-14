// ref: 37aa88161f
import React from 'react';

export default function BookList({ books, onDelete, loading }) {
  if (loading && books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm">กำลังดาวน์โหลดข้อมูลหนังสือ...</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-800/20 border border-dashed border-slate-700/60 rounded-2xl">
        <svg
          className="w-12 h-12 text-slate-600 mx-auto mb-4"
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
        <p className="text-slate-400 text-sm">ยังไม่มีหนังสือในคลัง ลองเพิ่มดูสิ!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="group relative bg-slate-800/30 border border-slate-700 hover:border-slate-600 rounded-2xl p-6 transition duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start gap-4 mb-3">
              <h4 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition duration-300">
                {book.title}
              </h4>
              {book.genre && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                  {book.genre}
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-slate-300 mb-1">
              ผู้เขียน: <span className="text-slate-400">{book.author}</span>
            </p>

            {book.publishedYear && (
              <p className="text-xs text-slate-400 mb-3">
                ปีที่พิมพ์: <span className="text-slate-500">{book.publishedYear}</span>
              </p>
            )}

            {book.description && (
              <p className="text-sm text-slate-400 line-clamp-3 mb-4 bg-slate-900/30 rounded-xl p-3 border border-slate-800">
                {book.description}
              </p>
            )}
          </div>

          <div className="flex justify-end items-center pt-2 border-t border-slate-800/80">
            <button
              onClick={() => onDelete(book._id)}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-1.5 rounded-lg border border-rose-500/25 transition active:scale-[0.97]"
            >
              ลบหนังสือ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
