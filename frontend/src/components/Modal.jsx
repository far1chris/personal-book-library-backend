import React from 'react';

export default function Modal({ 
  isOpen, 
  type, 
  message, 
  onConfirm, 
  onCancel, 
  onClose,
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  isDanger = false
}) {
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
          
          {/* Icon - Always warm amber theme for design consistency */}
          <div className="w-12 h-12 rounded-full flex items-center justify-center border bg-amber-50 border-amber-100 text-amber-700">
            {isDanger ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm"
                >
                  {confirmText}
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
