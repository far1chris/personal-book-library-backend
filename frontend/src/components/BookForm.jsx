// ref: 37aa88161f
import React from 'react';

export default function BookForm({ formData, onChange, onSubmit, titleInputRef, loading }) {
  return (
    <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm">
      <h3 className="text-lg font-bold font-serif text-stone-900 mb-6 flex items-center gap-2">
        <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
        เพิ่มหนังสือเข้าชั้น
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            ชื่อหนังสือ <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            ref={titleInputRef}
            value={formData.title}
            onChange={onChange}
            placeholder="เช่น The Hobbit"
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 outline-none transition text-sm"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            ผู้เขียน / ผู้แต่ง <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={onChange}
            placeholder="เช่น J.R.R. Tolkien"
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 outline-none transition text-sm"
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              หมวดหมู่ / แนว
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={onChange}
              placeholder="เช่น Fantasy"
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 outline-none transition text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
              ปีที่พิมพ์
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={onChange}
              placeholder="เช่น 1937"
              className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 outline-none transition text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
            บันทึกหรือเรื่องย่อ
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="สรุปเนื้อหาคร่าวๆ หรือบันทึกความจำ..."
            rows="3"
            className="w-full bg-[#FAF8F5] border border-stone-200 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 rounded-xl px-4 py-2.5 text-stone-900 placeholder-stone-400 outline-none transition text-sm resize-none"
            disabled={loading}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-amber-700 hover:bg-amber-800 active:scale-[0.98] text-white font-medium py-3 rounded-xl transition shadow-sm disabled:opacity-50 disabled:pointer-events-none text-sm"
        >
          {loading ? 'กำลังบันทึกข้อมูล...' : 'บันทึกเข้าชั้นหนังสือ'}
        </button>
      </form>
    </div>
  );
}
