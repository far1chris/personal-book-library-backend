// ref: 37aa88161f
import React from 'react';

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

export default function BookCard({ book, onDelete }) {
  return (
    <div
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
  );
}
