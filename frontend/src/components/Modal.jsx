import React from 'react';

export default function Modal({ isOpen, type, message, onConfirm, onCancel, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={type === 'confirm' ? onCancel : onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white border border-stone-200 p-6 rounded-2xl shadow-xl max-w-sm w-full mx-auto transition-all scale-100 z-10 font-sans">
        <div className="flex flex-col items-center text-center space-y-4">
          
          {/* Icon */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
            type === 'confirm' 
              ? 'bg-rose-50 border-rose-100 text-rose-600'
              : 'bg-amber-50 border-amber-100 text-amber-700'
          }`}>
            {type === 'confirm' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            )}
          </div>

          {/* Message */}
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              {type === 'confirm' ? 'ยืนยันการทำรายการ' : 'แจ้งเตือนระบบ'}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3 pt-2">
            {type === 'confirm' ? (
              <>
                <button
                  onClick={onCancel}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium py-2.5 rounded-xl transition text-sm border border-stone-200"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-medium py-2.5 rounded-xl transition text-sm shadow-sm font-semibold"
                >
                  ยืนยันลบ
                </button>
              </>
            ) : (
              <button
                onClick={onClose}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
              >
                ตกลง
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
