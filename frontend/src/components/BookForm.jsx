// ref: 37aa88161f
import React from 'react';

export default function BookForm({ formData, onChange, onSubmit, titleInputRef, loading }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-xl">
      <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
        เพิ่มหนังสือใหม่
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            ชื่อหนังสือ <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            ref={titleInputRef}
            value={formData.title}
            onChange={onChange}
            placeholder="เช่น The Hobbit"
            className="w-full bg-slate-900/60 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition text-sm"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            ผู้เขียน / ผู้แต่ง <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={onChange}
            placeholder="เช่น J.R.R. Tolkien"
            className="w-full bg-slate-900/60 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition text-sm"
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              หมวดหมู่ / แนวหนังสือ
            </label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={onChange}
              placeholder="เช่น Fantasy"
              className="w-full bg-slate-900/60 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              ปีที่พิมพ์
            </label>
            <input
              type="number"
              name="publishedYear"
              value={formData.publishedYear}
              onChange={onChange}
              placeholder="เช่น 1937"
              className="w-full bg-slate-900/60 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition text-sm[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            รายละเอียดหนังสือเพิ่มเติม
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="สรุปเนื้อหาคร่าวๆ หรือบันทึกความจำ..."
            rows="3"
            className="w-full bg-slate-900/60 border border-slate-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none transition text-sm resize-none"
            disabled={loading}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] text-slate-950 font-semibold py-3 rounded-xl transition shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? 'กำลังบันทึกข้อมูล...' : 'บันทึกหนังสือ'}
        </button>
      </form>
    </div>
  );
}
